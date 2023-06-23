import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/connectDb.mjs'
import { addImage } from './routes/add-image-details-to-db.mjs'
import { getPresignedUrl } from './routes/get-presigned-url.mjs'
import { searchImages } from './routes/search-images.mjs'

dotenv.config()

const app = express()
app.use(express.json())

connectDB()

app.use(cors())
app.options('*', cors())

app.use('/', addImage)
app.use('/', getPresignedUrl)
app.use('/', searchImages)
app.use('/test', (req, res) => {
  return res.status(200).json({ message: 'CICD test' })
})
app.use('/test1', (req, res) => {
  return res.status(200).json({ message: 'CICD test' })
})

const PORT = process.env.PORT || 5001

app.listen(PORT, console.log(`Server started on port ${PORT}`))
