import express from 'express'
import {
  addBlog,
  deleteBlogById,
  getAllBlogs,
  getBlogById,
  togglePublish
} from '../controllers/blog.controller.js'
import upload from '../middleware/multer.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/add', upload.single('image'), auth, addBlog)
router.get('/all', getAllBlogs)
router.get('/:blogId', getBlogById)
router.post('/delete', auth, deleteBlogById)
router.post('/toggle-publish', auth, togglePublish)

export {
  router as blogRouter
}