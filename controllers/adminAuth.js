const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { User } = require("../models");

class AdminAuth {
	static async adminRegister(req, res, next) {
		try {
			const { phoneNumber, password, email, KTP, gender, dateOfBirth } =
				req.body;
			const input = {
				phoneNumber,
				password,
				email,
				KTP,
				gender,
				dateOfBirth,
				role: "admin",
			};
			console.log(input);
			const admin = await User.create(input);
			res.status(201).json(admin);
		} catch (err) {
			console.log(err);
			next(err);
		}
	}

	static async adminLogin(req, res, next) {
		try {
			const { email, password } = req.body;
			const admin = await User.findOne({
				where: {
					email,
				},
			});
			if (!admin) {
				throw {
					name: "Unauthorized",
					code: 401,
					message: "Invalid email or password",
				};
			}
			const isValid = await comparePassword(password, admin.password);
			if (!isValid) {
				throw {
					name: "Unauthorized",
					code: 401,
					message: "Invalid email or password",
				};
			}
			const payload = {
				id: admin.id,
				email: admin.email,
				role: admin.role,
			};
			const access_token = generateToken(payload);
			res.status(200).json({
				access_token,
			});
		} catch (err) {
			console.log(err);
			next(err);
		}
	}
}

module.exports = AdminAuth;
