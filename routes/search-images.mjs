import express from 'express'
import { Router } from 'express'
import { Image } from '../models/Image.mjs'

const router = Router()

export const searchImages = router.get('/search-images', async (req, res) => {
  try {
    const { tags, page = 1, limit = 12 } = req.query
    const filter = tags ? { tags: { $in: tags } } : {}
    const skip = (page - 1) * limit
    const [images, total] = await Promise.all([
      Image.find(filter).skip(skip).limit(limit),
      Image.countDocuments(filter),
    ])

    return res.status(200).json({
      success: true,
      status: 200,
      msg: 'Images found',
      data: { images, total, returned: images.length },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      success: false,
      status: 500,
      msg: 'Unable to perform image search',
    })
  }
})
