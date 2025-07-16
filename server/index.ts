import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { Pantries, Recipients } from './drizzle/schema.ts'
import { configDotenv } from 'dotenv'
import { InferInsertModel } from 'drizzle-orm';
import { createClient } from '@supabase/supabase-js'

import express from 'express'
import cors from 'cors'
import ErrorCodes from './error_codes.ts'


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

app.listen(PORT, () => {
    console.log(`|| SERVER RUNNING ON PORT : ${PORT} ||`)
})