const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class UserController {
	static async userRegister(req, res, next) {
		try {
			let { phoneNumber, password, email, KTP, gender, dateOfBirth } = req.body;
			let editPhone;
			if (phoneNumber[0] === "0") {
				editPhone = phoneNumber.replace(phoneNumber[0], "62");
			}
			let formated;
			if (gender == "female") {
				const edit = Number(KTP[6]) + 4;
				formated = [...KTP];
				formated[6] = String(edit);
				formated = formated.join("");
			} else {
				formated = [...KTP];
				formated = formated.join("");
			}
			const input = {
				phoneNumber: editPhone,
				password,
				email,
				KTP: formated,
				gender,
				dateOfBirth,
			};
			console.log(input);
			const user = await User.create(input);
			res.status(201).json(user);
		} catch (err) {
			console.log(err);
			next(err);
		}
	}

	static async userLogin(req, res, next) {
		try {
			const { phoneNumber, password } = req.body;
			console.log(req.body);
			const user = await User.findOne({
				where: {
					phoneNumber,
				},
			});
			if (!user) {
				throw {
					code: 401,
					message:
						"incorrect phone number or password or phone number start with 62",
				};
			}
			const isValid = comparePassword(password, user.password);
			if (!isValid) {
				throw {
					code: 401,
					message: "incorrect phone number or password",
				};
			}
			const payload = {
				id: user.id,
				phoneNumber: user.phoneNumber,
				email: user.email,
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

module.exports = UserController;
