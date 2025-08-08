import jwt from 'jsonwebtoken'

const adminLogin = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body

    if (email !== process.env.ADMIN_EMAIL || (password !== process.env.ADMIN_PASSWORD)) {
      return res.json({
        success: false,
        message: 'Invalid Credential'
      })
    }

    const token = jwt.sign({
      email
    }, process.env.SECRET_TOKEN)

    res.json({
      success: true,
      token
    })
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}

export {
  adminLogin
}