import jwt from "jsonwebtoken"

const auth = (req, res, next) => {
  const token = req.headers.authorization

  try {
    jwt.verify(token, process.env.SECRET_TOKEN)
    next()
  } catch (error) {
    res.json({
      success: false,
      message: 'Invalid Token'
    })
  }
}

export default auth