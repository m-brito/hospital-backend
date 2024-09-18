import { Router, Request, Response, NextFunction } from 'express'
import { User } from '../models/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import validate from '../../middlewares/validation';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'

const registerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
	email: z.string().email('Invalid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters long'),
	role: z.enum(['admin', 'doctor', 'patient']).optional().default('patient'),
})

const loginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters long'),
})

const router = Router()

router.post(
	'/register',
	validate(registerSchema),
	async (req: Request, res: Response) => {
		const { name, password, email, role } = req.body
		const hashedPassword = await bcrypt.hash(password, 10)
		try {
			const user = User.create({
				name,
				password: hashedPassword,
				email,
				role,
			})
			await user.save()
			res.status(201).json(user)
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: 'Error registering user' })
		}
	},
)

router.post(
	'/login',
	validate(loginSchema),
	async (req: Request, res: Response) => {
		const { email, password } = req.body
		try {
			const user = await User.findOneBy({ email })
			if (!user)
				return res.status(404).json({ message: 'User not found' })

			const isMatch = await bcrypt.compare(password, user.password)
			if (!isMatch)
				return res.status(400).json({ message: 'Incorrect password' })

			const token = jwt.sign(
				{ id: user.id, role: user.role },
				JWT_SECRET,
				{
					expiresIn: '24h',
				},
			)
			res.json({ token })
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: 'Error logging in' })
		}
	},
)

export default router
