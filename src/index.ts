import express, { Request, Response } from 'express'

import AppDataSource from './config/ormconfig'
import { authMiddleware } from '../middlewares/authMiddleware'
import authRoutes from './routes/authRoutes'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000

app.use(express.json())

app.use('/auth', authRoutes)

AppDataSource.initialize()
	.then(() => {
		console.log('Database connected and synchronized!')

		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`)
		})
	})
	.catch((err) => {
		console.error('Unable to connect to the database:', err)
	})

app.get('/', (req: Request, res: Response) => {
	res.send('Hello World!')
})
