'use strict'
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod }
	}
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const dotenv_1 = __importDefault(require('dotenv'))
const ormconfig_1 = __importDefault(require('./config/ormconfig'))
const authRoutes_1 = __importDefault(require('./routes/authRoutes'))
dotenv_1.default.config()
const app = (0, express_1.default)()
const PORT = parseInt(process.env.PORT, 10) || 3000
app.use(express_1.default.json())
app.use('/auth', authRoutes_1.default)
ormconfig_1.default
	.initialize()
	.then(() => {
		console.log('Database connected and synchronized!')
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`)
		})
	})
	.catch((err) => {
		console.error('Unable to connect to the database:', err)
	})
app.get('/', (req, res) => {
	res.send('Hello World!')
})
