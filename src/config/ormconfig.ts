import { DataSource } from 'typeorm'
import dotenv from 'dotenv'
import { User } from './../models/user'

dotenv.config()

const AppDataSource = new DataSource({
	type: 'mysql',
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT as string, 10) || 3306,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	synchronize: false,
	logging: false,
	entities: [User],
})

export default AppDataSource
