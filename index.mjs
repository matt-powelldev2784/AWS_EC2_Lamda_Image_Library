import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()
app.use(express.json())

app.use(cors())
app.options('*', cors())

const PORT = process.env.PORT || 5001

app.listen(PORT, console.log(`Server started on port ${PORT}`))
