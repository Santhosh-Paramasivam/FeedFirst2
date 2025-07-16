import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { Pantries, Recipients } from './drizzle/schema.ts'
import { configDotenv } from 'dotenv'
import { InferInsertModel } from 'drizzle-orm';

import express from 'express'
import ErrorCodes from './error_codes.ts';

configDotenv()

const PORT = 8080

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

const connectionString = process.env.DATABASE_URL

const client = postgres(connectionString!, { prepare: false })
const db = drizzle(client);

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
    if('email_ID' in Object.keys(req.body)) {
        const result = await db.select({'email_ID':req.body['email_ID']}).from(Recipients)
        console.log(result)
    }

    try { 
        await db.insert(Recipients).values(req.body)
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