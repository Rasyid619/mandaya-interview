async function isAdmin(req, res, next) {
	try {
		const role = req.userLogin.role;

		if (role !== "admin") {
			throw {
				name: "Forbidden",
				code: 403,
				msg: "You dont have Permission to Access",
			};
		}
		next();
	} catch (err) {
		next(err);
	}
}

module.exports = { isAdmin };
