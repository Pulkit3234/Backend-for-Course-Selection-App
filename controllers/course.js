const User = require('../models/UserSchema');

exports.register = async (req, res, next) => {
	const courses = req.body.courses;
	console.log(req.body);
	const name = req.body.name;

	const register = req.body.register;

	try {
		if (!register) {
			const user = await User.findOneAndUpdate(
				{ name },
				{ subjects: courses, register, credits: 15 },
				{ new: true }
			);
			console.log(user, 'empty');
			res.status(200).json({ user });
		} else {
			const user = await User.findOneAndUpdate(
				{ name },
				{ subjects: courses, register, credits: 0 },
				{ new: true }
			);
			console.log('else');
			res.status(200).json({ user });
		}
	} catch (error) {
		console.log(error);
		res.status(401).json({ error });
	}
};

exports.fetch = async (req, res, next) => {
	console.log(req.query['0'], 'reached');
	const name = req.query['0'];
	const user = await User.find({ name });

	console.log(user);
	res.status(200).json({ user });
};
