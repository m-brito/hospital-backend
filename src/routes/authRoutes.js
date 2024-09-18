'use strict'
var __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(function (resolve) {
						resolve(value)
					})
		}
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value))
				} catch (e) {
					reject(e)
				}
			}
			function rejected(value) {
				try {
					step(generator['throw'](value))
				} catch (e) {
					reject(e)
				}
			}
			function step(result) {
				result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected)
			}
			step(
				(generator = generator.apply(thisArg, _arguments || [])).next(),
			)
		})
	}
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod }
	}
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = require('express')
const User_1 = require('../models/User')
const Patient_1 = require('../models/Patient')
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'))
const bcryptjs_1 = __importDefault(require('bcryptjs'))
const zod_1 = require('zod')
const validation_1 = __importDefault(require('../../middlewares/validation'))
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'
const registerSchema = zod_1.z.object({
	name: zod_1.z.string().min(1, 'Name is required'),
	email: zod_1.z.string().email('Invalid email address'),
	password: zod_1.z
		.string()
		.min(6, 'Password must be at least 6 characters long'),
	role: zod_1.z
		.enum(['admin', 'doctor', 'patient'])
		.optional()
		.default('patient'),
	birthdate: zod_1.z.string().optional(),
	address: zod_1.z.string().optional(),
})
const loginSchema = zod_1.z.object({
	email: zod_1.z.string().email('Invalid email address'),
	password: zod_1.z
		.string()
		.min(6, 'Password must be at least 6 characters long'),
})
const router = (0, express_1.Router)()
router.post(
	'/register',
	(0, validation_1.default)(registerSchema),
	(req, res) =>
		__awaiter(void 0, void 0, void 0, function* () {
			const { name, password, email, birthdate, address } = req.body
			const hashedPassword = yield bcryptjs_1.default.hash(password, 10)
			try {
				const existingUser = yield User_1.User.findOneBy({ email })
				if (existingUser) {
					return res
						.status(400)
						.json({ message: 'Email already in use' })
				}
				const user = new User_1.User()
				user.name = name
				user.email = email
				user.password = hashedPassword
				user.role = 'patient'
				const savedUser = yield user.save()
				if (birthdate || address) {
					const patient = new Patient_1.Patient()
					patient.birthdate = new Date(birthdate)
					patient.address = address
					patient.user = savedUser
					yield patient.save()
				}
				res.status(201).json(savedUser)
			} catch (error) {
				console.error(error)
				res.status(500).json({ message: 'Error registering user' })
			}
		}),
)
router.post('/login', (0, validation_1.default)(loginSchema), (req, res) =>
	__awaiter(void 0, void 0, void 0, function* () {
		const { email, password } = req.body
		try {
			const user = yield User_1.User.findOneBy({ email })
			if (!user)
				return res.status(404).json({ message: 'User not found' })
			const isMatch = yield bcryptjs_1.default.compare(
				password,
				user.password,
			)
			if (!isMatch)
				return res.status(400).json({ message: 'Incorrect password' })
			const token = jsonwebtoken_1.default.sign(
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
	}),
)
exports.default = router
