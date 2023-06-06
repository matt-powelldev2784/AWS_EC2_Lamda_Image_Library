import mongoose from 'mongoose'

const ImageSchema = new mongoose.Schema({
  path: String,
  thumbnailPath: String,
  uploadedBy: String,
  description: String,
  tags: [String],
})

export const Image = mongoose.model('Image', ImageSchema)
