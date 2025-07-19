import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { Item, Pantries, PantryManager, Recipients, userStatusEnum } from './drizzle/schema.ts'
import { configDotenv } from 'dotenv'
import { eq, InferInsertModel,and } from 'drizzle-orm';
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

import express from 'express'
import cors from 'cors'
import ErrorCodes from './error_codes.ts'
import { Recoverable } from 'repl';
import { receiveMessageOnPort } from 'worker_threads';


configDotenv()

const PORT = 8080

const app = express()

const corsOptions = {
    origin: process.env.CLIENT_URL
}

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors(corsOptions))

const connectionString = process.env.DATABASE_URL

const client = postgres(connectionString!, { prepare: false })
const db = drizzle(client);

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)

type NewUser = InferInsertModel<typeof Recipients>;

function checkType(obj, typeObj, res) {
    typeObj = Object.keys(typeObj)
    typeObj.pop()

    let a = Array()

    for(let val of typeObj) {
        if(!(val in obj)) {
            res.status(400).send({'Bad Request':`Missing field ${val}`})
            return false
        }
    }

    return true
}

function checkPresent(obj, arr, res) {
    for(let val of arr) {
        if(!(val in obj) || !obj[val].trim()) {
            res.status(400).send({'Bad Request':`Missing field ${val}`})
            return false
        }
    }

    return true
}

async function hash(string) {
  const utf8 = new TextEncoder().encode(string);
  const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((bytes) => bytes.toString(16).padStart(2, '0'))
    .join('');
  return hashHex;
}

app.get('/', (req, res) => {
    res.send('Hello')
})

app.post('/register_user', async (req, res) => {
    if(!('email_ID' in req.body) || !('password' in req.body) || !req.body['email_ID'].trim() || !req.body['password'].trim()) {
        res.status(400).send({'error': 'Missing email or password missing'})
        return 
    }

    const {data,error} = await supabase.auth.signUp({
        email:req.body['email_ID'],
        password:req.body['password']
    })

    if(error) {
        console.log(error)
        res.status(error.status).send({'error':error.code})
        return
    }
    if(data) {
        var authId = data.user?.id
    }

    try {
        const { password, ...userData } = req.body
        userData['recipient_ID'] = authId
        userData['status'] = 'UNVERIFIED'
        await db.insert(Recipients).values(userData)
        res.status(200).send({'Success':'User Registered'})
    }
    catch(e) {
        if(Object.keys(ErrorCodes).indexOf(e.cause.code) > -1) {
            res.status(400).send({'error': ErrorCodes[e.cause.code]})
            return
        }

        console.log(e)
        res.status(500).send('Internal Server Error')
    }
})

app.post('/register_admin', async (req, res) => {
    const requiredFields = ['email_ID', 'password', 'pantry_key']

    if(!checkPresent(req.body, requiredFields, res)) {
        console.log('returning')
        return 
    }

    const results = await db.select({
        pantry_ID: Pantries.pantry_ID,
        hashed_pantry_key : Pantries.hashed_pantry_key,
    }).from(Pantries).where(eq(Pantries.hashed_pantry_key, await hash(req.body['pantry_key'])))
    console.log(results)

    const pantry_ID = results[0].pantry_ID

    const {data,error} = await supabase.auth.signUp({
        email:req.body['email_ID'],
        password:req.body['password']
    })

    if(error) {
        console.log(error)
        res.status(error.status).send({'error':error.code})
        return
    }
    if(data) {
        var authId = data.user?.id
    }

    try {
        const { password, ...userData } = req.body
        userData['pantrymanager_ID'] = authId
        userData['pantry_ID'] = pantry_ID
        await db.insert(PantryManager).values(userData)
        res.status(200).send({'Success':'User Registered'})
    }
    catch(e) {
        if(Object.keys(ErrorCodes).indexOf(e.cause.code) > -1) {
            res.status(400).send({'error': ErrorCodes[e.cause.code]})
            return
        }

        console.log(e)
        res.status(500).send('Internal Server Error')
    }
})

app.get('/pantries', async (req, res) => {
    const result = await db.select({
        pantry_name: Pantries.pantry_name, 
        pantry_ID: Pantries.pantry_ID, 
        pantry_address: Pantries.pantry_address,
        contact_number: Pantries.contact_number
    }).from(Pantries).execute()
    console.log(result)

    res.status(200).send(result)
})

app.post('/pantries', async (req, res) => {
    const pantryKey = crypto.randomUUID()
    const hashedPantryKey = await hash(pantryKey)

    console.log(pantryKey)
    console.log(hashedPantryKey)

    try {
        console.log(req.body)
        let pantryDetails = JSON.parse(JSON.stringify(req.body))
        pantryDetails['hashed_pantry_key'] = hashedPantryKey
        console.log(pantryDetails)
        const result = await db.insert(Pantries).values(pantryDetails)
        console.log(result)
        res.status(200).send({'Success':'Pantry Registered', 'pantry_key': pantryKey})
    }
    catch(e) {
        if(Object.keys(ErrorCodes).indexOf(e.cause.code) > -1) {
            res.status(400).send({'error': ErrorCodes[e.cause.code]})
            return
        }

        console.log(e)
        res.status(500).send('Internal Server Error')
    }
})

app.post('/login', async (req, res) => {
    const requiredFields = ['email_ID', 'password','role']

    if(!checkPresent(req.body, requiredFields, res)) {
        return 
    }

    const {data, error} = await supabase.auth.signInWithPassword({
        email: req.body['email_ID'],
        password: req.body['password']
    })

    console.log(data)
    
    if(error || !data) {
        console.log(error)
        res.status(400).send({'error':'Invalid login credentials'})
        return
    }

        let result
        try {
            if(req.body.role === 'admin') {
                result = await db.select().from(PantryManager).where(eq(PantryManager.pantrymanager_ID, data.user.id))
            }
            else if(req.body.role === 'user') {
                result = await db.select().from(Recipients).where(eq(Recipients.recipient_ID, data.user.id))
            }
            console.log(result)
        }
        catch(e) {
            if(Object.keys(ErrorCodes).indexOf(e.cause.code) > -1) {
                res.status(400).send({'error': ErrorCodes[e.cause.code]})
                return
            }

            console.log(e)
            res.status(500).send('Internal Server Error')
        }

        if(result.length <= 0) {
            res.status(400).send({'error':'Invalid login credentials'})
            return
        }

    if(data) {
        res.status(200).send({'Success':'User logged in', 'access_token':data.session.access_token, 'role':req.body.role})
        console.log(data)
    }
})

async function validateAccessToken(access_token : string, role : string, res){
    access_token = access_token.slice(7)

    var {data,error} = await supabase.auth.getUser(access_token)

    if(error || !data) {
        console.log(error)
        res.status(400).send({'error':'Invalid login credentials'})
        return false
    }

    // The above state may lead to an automatic log out
    let authId = data.user!.id!

    let result 
    try {
        if(role === 'admin') {
            result = await db.select().from(PantryManager).where(eq(PantryManager.pantrymanager_ID, authId))
        }
        else if(role === 'user') {
            result = await db.select().from(Recipients).where(eq(Recipients.recipient_ID, authId))
        }
   }
    catch(e) {
            if(Object.keys(ErrorCodes).indexOf(e.cause.code) > -1) {
                res.status(400).send({'error': ErrorCodes[e.cause.code]})
                return false
            }

            console.log(e)
            res.status(500).send('Internal Server Error')
            return false
        }

    if(result.length <= 0) {
        res.status(400).send({'error':'Invalid login credentials'})
        return false
    }

    return result
}

app.post('/items', async (req, res) => {
    const requiredFields = ['item_name', 'item_unit','access_token']

    if(!checkPresent(req.body, requiredFields, res)) {
        return 
    }

    let result = await validateAccessToken(req.body.access_token, 'admin', res)

    if(!result) return

    let pantry_ID = result[0].pantry_ID

    try {
        result = await db.insert(Item).values({
            "current_stock": "MEDIUM",
            "item_name":req.body.item_name,
            "units_used":req.body.item_unit,
            "pantry_ID":pantry_ID
        })
    }
    catch(e) {
            if(Object.keys(ErrorCodes).indexOf(e.cause.code) > -1) {
                res.status(400).send({'error': ErrorCodes[e.cause.code]})
                return
            }

            console.log(e)
            res.status(500).send('Internal Server Error')
    }

    res.status(200).send({'Success':'Item created'})
})

app.get('/items', async (req, res) => {
    const requiredFields = ['authorization']

    console.log(req.headers)
    if(!checkPresent(req.headers, requiredFields, res)) {
        return 
    }

    let authId = await validateAccessToken(req.headers.authorization, 'admin', res)

    if(!authId) return

    let pantry_ID = authId[0].pantry_ID

    let result
    try {
        result = await db.select().from(Item).where(eq(Item.pantry_ID, pantry_ID))
    } 
    catch(e) {
        if(Object.keys(ErrorCodes).indexOf(e.cause.code) > -1) {
            res.status(400).send({'error': ErrorCodes[e.cause.code]})
            return
        }

        console.log(e)
        res.status(500).send('Internal Server Error')
    }

    console.log(result)
    res.status(200).send(result)
})

app.delete('/items/:item_ID', async (req, res) => {
    const requiredHeaders = ['authorization']

    console.log(req.headers)
    if(!checkPresent(req.headers, requiredHeaders, res)) {
        return 
    }

    let authId = await validateAccessToken(req.headers.authorization, 'admin', res)

    if(!authId) return

    let pantry_ID = authId[0].pantry_ID

    let result
    try {
        result = await db.delete(Item).where(and(eq(Item.item_ID, req.params.item_ID), eq(Item.pantry_ID, pantry_ID)))
    }
    catch(e) {
        if(Object.keys(ErrorCodes).indexOf(e.cause.code) > -1) {
            res.status(400).send({'error': ErrorCodes[e.cause.code]})
            return
        }

        console.log(e)
        res.status(500).send('Internal Server Error')
    }

    res.status(201).send({'Success':'Item deleted'})
})

app.get('/users', async (req, res) => {
    const requiredHeaders = ['authorization']

    console.log(req.headers)
    if(!checkPresent(req.headers, requiredHeaders, res)) {
        return 
    }

    let authId = await validateAccessToken(req.headers.authorization, 'admin', res)

    if(!authId) return

    let pantry_ID = authId[0].pantry_ID

    let result
    try {
        result = await db.select().from(Recipients).where(and(eq(Recipients.pantry_ID, pantry_ID), eq(Recipients.status, userStatusEnum.enumValues[0])))
    } 
    catch(e) {
        if(Object.keys(ErrorCodes).indexOf(e.cause.code) > -1) {
            res.status(400).send({'error': ErrorCodes[e.cause.code]})
            return
        }

        console.log(e)
        res.status(500).send('Internal Server Error')
    }

    console.log(result)
    res.status(200).send(result)
})

app.put('/user_status', async (req, res) => {
    const requiredHeaders = ['authorization']
    const requiredFields = ['recipient_ID', 'status','priority']

    console.log(req.headers)
    if(!checkPresent(req.headers, requiredHeaders, res)) {
        return 
    }

    if(!checkPresent(req.body, requiredFields, res)) {
        return 
    }

    let authId = await validateAccessToken(req.headers.authorization, 'admin', res)

    if(!authId) return

    let pantry_ID = authId[0].pantry_ID

    let result
    try {
        result = await db.update(Recipients).set({
            status: req.body.status,
            priority: req.body.priority
        }).where(eq(Recipients.recipient_ID, req.body.recipient_ID))
    }
    catch(e) {
        if(Object.keys(ErrorCodes).indexOf(e.cause.code) > -1) {
            res.status(400).send({'error': ErrorCodes[e.cause.code]})
            return
        }

        console.log(e)
        res.status(500).send('Internal Server Error')
    }

    res.status(201).send({'Success':'User status updated'})
})

app.listen(PORT, () => {
    console.log(`|| SERVER RUNNING ON PORT : ${PORT} ||`)
})