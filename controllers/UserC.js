const {User} = require('../models/models')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const generateJWT = (id, username, role) => {
	return jwt.sign(
		{ id, username, role },
		process.env.SECRET_KEY,
		{ expiresIn: '24h' }
	)
}


class UserController {
	async register (req, res) {
		try {
			const {username, email, password} = req.body
			const cand = await User.findOne({ where: { email } })
			if (cand) {
				return res.status(403).json({message:"User with email is arleady exists"})
			}
			const hashPass = bcrypt.hashSync(password, 5)
			const user = await User.create({
          	username,
	          email,
	          password: hashPass,
			})
			return res.json(user)
		} catch (e) {
			 console.log(e)
			return res.status(500).json({message: 'Register error'})
		}
	}
	async login (req, res) {
		try {
			const {username, password} = req.body
      const user = await User.findOne({where:{username}})
			if(!user) {
				return res.status(404).json({message: 'User not found'})
			}
			const token = generateJWT(user.id, user.username, user.role)
			return res.json({token})
		}	catch(e) { 
			console.log(e)
			return res.status(500).json({message: 'Login error'})
		}
	}
	async auth (req, res) {
		const token = generateJWT(req.user.id, req.user.username, req.user.role)
		return res.json({token})
	}
}
module.exports = new UserController()