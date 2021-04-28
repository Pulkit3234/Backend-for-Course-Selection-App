const bcrypt = require('bcryptjs');
const User = require('../models/UserSchema');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
	console.log(req.body);
	const email = req.body.email;
	const password = req.body.password;
	const name = req.body.name;
	try {
		const result = await User.findOne({ email });

		if (result) {
			res.json({ message: 'User Exists' });
		}

		const hashedPass = await bcrypt.hash(password, 12);
		const user = await User.create({ email, password: hashedPass, name });
		console.log(user);

		const token = await jwt.sign({ email: user.email, id: user._id }, 'secret', { expiresIn: '1day' });

		res.status(200).json({ name: user.name, token });
	} catch (error) {
		res.json(error);
	}
};

exports.login = async (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	try {
		const result = await User.findOne({ email });
		if (!result) {
			res.status(404).json({ message: 'User not found' });
		}

		const authenticate = await bcrypt.compare(password, result.password);
		console.log(authenticate);
		if (!authenticate) {
			res.json(400).json({ message: 'Login Failed' });
		}

		const token = await jwt.sign({ email: result.email, id: result._id }, 'secret', {
			expiresIn: '1day',
		});

		res.status(200).json({ email: result.email, name: result.name, token });
	} catch (error) {
		console.log(error);
		res.json(error);
	}
};
