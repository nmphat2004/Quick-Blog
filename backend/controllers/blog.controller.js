import fs from 'fs'
import imagekit from '../configs/imageKit.js'
import Blog from '../models/blog.js'

const addBlog = async (req, res) => {
  try {
    const {
      title,
      subTitle,
      description,
      category,
      isPublished
    } = JSON.parse(req.body.blog)
    const imageFile = req.file

    // Check if all field are valid
    if (!title || !description || !category || !imageFile) return res.json({
      success: false,
      message: 'Missing required field'
    })

    const fileBuffer = fs.readFileSync(imageFile.path)

    // Upload Image to ImageKit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: '/blogs'
    })

    // Optimization through imageKit URL transformation
    const imageURL = imagekit.url({
      path: response.filePath,
      transformation: [{
          quality: 'auto'
        },
        {
          format: 'webp'
        },
        {
          width: 1280
        }
      ]
    })

    const image = imageURL

    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished
    })

    res.json({
      success: true,
      message: 'Add Blog Successfully'
    })
  } catch (error) {
    res.json({
      success: true,
      message: error.message
    })
  }
}

export {
  addBlog
}