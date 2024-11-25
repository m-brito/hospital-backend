import express, { Request, Response } from 'express'

import AppDataSource from './config/ormconfig'
import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoutes'
import appointmentRoutes from './routes/appointmentRoutes'
import doctorRoutes from './routes/doctorRoutes'
import examRoutes from './routes/examRoutes'
import dotenv from 'dotenv'
import cors from 'cors';


dotenv.config()

const app = express()
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000

app.use(cors());
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/appointment', appointmentRoutes)
app.use('/doctor', doctorRoutes)
app.use('/exam', examRoutes)

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
