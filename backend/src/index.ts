import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'

import authRoutes from './routes/auth'
import userRoutes from './routes/users'

const app = express()
const port = 7000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)

app.listen(port, () => {
	console.log('Server running on localhost: 7000')
})
