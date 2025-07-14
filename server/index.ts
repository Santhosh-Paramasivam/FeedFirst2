import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { Pantries } from './drizzle/schema.ts'
import { configDotenv } from 'dotenv'

import express from 'express'

configDotenv()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

const connectionString = process.env.DATABASE_URL

const client = postgres(connectionString!, { prepare: false })
const db = drizzle(client);

app.get('/', (req, res) => {
    res.send('Hello')
})

app.listen(8080, () => {
    console.log("||SERVER RUNNING||")
})