import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import { v2 as cloudinary } from 'cloudinary'

import authRoutes from './routes/auth'
import userRoutes from './routes/users'
import myHotelRoutes from './routes/my-hotels'
import hotelRoutes from './routes/hotels'

const app = express()
const port = 7000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		credentials: true,
	})
)

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/my-hotels', myHotelRoutes)
app.use('/api/hotels', hotelRoutes)

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.listen(port, () => {
	console.log('Server running on localhost: 7000')
})
