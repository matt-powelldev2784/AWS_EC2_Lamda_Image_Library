import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/connectDb.mjs'

dotenv.config()

const app = express()
app.use(express.json())

connectDB()

app.use(cors())
app.options('*', cors())

const PORT = process.env.PORT || 5001

app.listen(PORT, console.log(`Server started on port ${PORT}`))

app.get('/test', (req, res) => {
  res.send('API is running....')
})
