const errorHandler = (err, req, res, next) => {
	switch (err.name) {
		case "SequelizeValidationError":
		case "SequelizeUniqueConstraintError":
			err = err.errors.map((el) => el.message);
			const message = err.join("\n");
			res.status(400).json({ message });
			break;
		case "Invalid email / password":
		case "JsonWebTokenError":
		case "TokenExpiredError":
		case "Unauthorized":
		case "Invalid Token":
			res.status(401).json({
				message: err.message,
			});
			break;
		case "Forbidden":
			res.status(403).json({
				message: err.message,
			});
			break;
		case "Not Found":
		case "Empty List":
			res.status(404).json({
				message: err.message,
			});
			break;
		default:
			res.status(500).json({ message: "Internal Server Error" });
	}
};

module.exports = errorHandler;
