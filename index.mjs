import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/connectDb.mjs'
import { addImage } from './routes/add-image-details-to-db.mjs'
import { getPresignedUrl } from './routes/get-presigned-url.mjs'

dotenv.config()

const app = express()
app.use(express.json())

connectDB()

app.use(cors())
app.options('*', cors())

app.use('/', addImage)
app.use('/', getPresignedUrl)

const PORT = process.env.PORT || 5001

app.listen(PORT, console.log(`Server started on port ${PORT}`))
