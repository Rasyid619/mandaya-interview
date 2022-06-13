const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
	try {
		const { access_token } = req.headers;
		if (!access_token) {
			throw {
				code: 401,
				message: "You must login first",
			};
		}
		const decoded = await verifyToken(access_token);
		const user = await User.findOne({
			where: {
				id: decoded.id,
			},
		});
		if (!user) {
			throw {
				code: 401,
				message: "You must login first",
			};
		}
		req.userLogin = {
			id: user.id,
			phoneNumber: user.phoneNumber,
			role: user.role,
			email: user.email,
		};
		next();
	} catch (err) {
		next(err);
	}
}

module.exports = authentication;
