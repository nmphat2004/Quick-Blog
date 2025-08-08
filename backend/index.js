import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js'

const port = process.env.PORT || 3000

const app = express()
await connectDB()

// Middlewares
app.use(cors)
app.use(express.json())

app.listen(port, () => {
  console.log(`App running on port ${port}`);
})

export default app