import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)

const app = express()
const port = 7000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/api/test', async (req: Request, res: Response) => {
	res.json({ message: 'Hello from express endpoint' })
})

app.listen(port, () => {
	console.log('Server running on localhost: 7000')
})
