import { Router } from 'express'
import { Image } from '../models/Image.mjs'

const router = Router()

const getThumbnailPath = (path) => {
  const thumbnailPathArray = path.split('/')

  thumbnailPathArray[2] =
    'mattpowell2784-aws-image-hosting-thumbnails.s3.eu-west-2.amazonaws.com'
  
  thumbnailPathArray[3] = `${thumbnailPathArray[3]}-thumbnail`

  const thumbnailPath = thumbnailPathArray.join('/')

  return thumbnailPath
}

export const addImage = router.post(
  '/add-image-details-to-db',
  async (req, res) => {
    try {
      const { path, uploadedBy, description, tags } = req.body

      if (!path || !uploadedBy || !description || !tags) {
        return res.status(400).json({
          success: false,
          status: 400,
          msg: 'Please provide all required fields',
        })
      }

      const thumbnailPath = getThumbnailPath(path)

      const newImage = await Image.create({
        path,
        thumbnailPath,
        uploadedBy,
        description,
        tags,
      })

      return res.status(201).json({
        success: true,
        status: 201,
        msg: 'Image deatils added to database.',
        data: newImage,
      })
    } catch (err) {
      console.error(err)
      res.status(500).json({
        success: false,
        status: 500,
        msg: 'Server Error',
      })
    }
  }
)
