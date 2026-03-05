import express from 'express';
import {
	addBlog,
	addComment,
	deleteBlogById,
	generateContent,
	getAllBlogs,
	getBlogById,
	getBlogComments,
	togglePublish,
	updateBlog,
} from '../controllers/blog.controller.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/add', upload.single('image'), auth, addBlog);
router.post('/update', upload.single('image'), auth, updateBlog);
router.get('/all', getAllBlogs);
router.get('/:blogId', getBlogById);
router.post('/delete', auth, deleteBlogById);
router.post('/toggle-publish', auth, togglePublish);
router.post('/add-comment', addComment);
router.post('/comments', getBlogComments);
router.post('/generate', generateContent);

export { router as blogRouter };
