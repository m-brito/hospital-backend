'use strict'
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod }
	}
Object.defineProperty(exports, '__esModule', { value: true })
const typeorm_1 = require('typeorm')
const dotenv_1 = __importDefault(require('dotenv'))
const User_1 = require('../models/User')
const Administrador_1 = require('../models/Administrador')
const Doctor_1 = require('../models/Doctor')
const Patient_1 = require('../models/Patient')
const Appointment_1 = require('../models/Appointment')
const Exam_1 = require('../models/Exam')
const Notification_1 = require('../models/Notification')
dotenv_1.default.config()
const AppDataSource = new typeorm_1.DataSource({
	type: 'mysql',
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT, 10) || 3306,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	synchronize: false,
	logging: false,
	entities: [
		User_1.User,
		Administrador_1.Administrator,
		Doctor_1.Doctor,
		Patient_1.Patient,
		Appointment_1.Appointment,
		Exam_1.Exam,
		Notification_1.Notification,
	],
})
exports.default = AppDataSource
