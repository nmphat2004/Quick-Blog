import express from 'express'
import {
  addBlog
} from '../controllers/blog.controller.js'
import upload from '../middleware/multer.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/add', upload.single('image'), auth, addBlog)

export {
  router as blogRouter
}