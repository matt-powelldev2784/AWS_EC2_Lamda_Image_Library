import { Router } from 'express'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const router = Router()

export const getPresignedUrl = router.get(
  '/get-presigned-url',
  async (req, res) => {
    try {
      const client = new S3Client({
        region: 'eu-west-2',
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID,
        },
      })

      const addImageParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: 'test.jpg',
      }

      const addImagecCommand = new PutObjectCommand(addImageParams)
      const url = await getSignedUrl(client, addImagecCommand, {
        expiresIn: 60 * 60,
      })
      console.log('url', url)

      res.status(200).json({
        success: true,
        status: 200,
        msg: 'Presigned URL generated',
        url: url,
      })

      return url
    } catch (err) {
      console.log('err', err)
    }
  }
)
