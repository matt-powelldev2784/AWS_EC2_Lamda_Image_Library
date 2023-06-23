import express from 'express'
import { Router } from 'express'
import { Image } from '../models/Image.mjs'

const router = Router()

export const findImageByDbId = router.get('/single-image', async (req, res) => {
  try {
    const { id } = req.query
    const image = await Image.findById(id)

    return res.status(200).json({
      success: true,
      status: 200,
      msg: 'Image found',
      data: [image],
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
