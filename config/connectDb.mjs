import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Mongo DB connected')
  } catch (err) {
    console.error('Error connecting to MongoDB:', err)
    process.exit(1)
  }
}
