"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User.init(
		{
			phoneNumber: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					notEmpty: {
						msg: "Phone number is required",
					},
					notNull: {
						msg: "Phone number is required",
					},
					isNumeric: {
						msg: "Phone number must be number",
					},
				},
			},
			gender: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "gender is required",
					},
					notNull: {
						msg: "gender is required",
					},
					isIn: {
						args: [["male", "female"]],
						msg: "choose your gender",
					},
				},
			},
			dateOfBirth: {
				type: DataTypes.DATE,
				allowNull: false,
				validate: {
					notNull: {
						msg: "date of birth is required",
					},
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					notEmpty: {
						msg: "Email is required",
					},
					notNull: {
						msg: "Email is required",
					},
				},
			},
			KTP: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					notEmpty: {
						msg: "KTP is required",
					},
					notNull: {
						msg: "KTP is required",
					},
					isNumeric: {
						msg: "KTP must be number",
					},
					len: {
						args: [16, 16],
						msg: "KTP must be 16 digits",
					},
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Password is required",
					},
					notNull: {
						msg: "Password is required",
					},
					is: {
						args: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.])[a-zA-Z0-9!@#$%^&*.]{6,}$/,
						msg: "Password must be at least 6 characters and contain at least one number, one uppercase letter and one special character",
					},
				},
			},
			role: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: "user",
			},
		},
		{
			hooks: {
				beforeCreate: (user) => {
					user.password = hashPassword(user.password);
				},
			},
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
