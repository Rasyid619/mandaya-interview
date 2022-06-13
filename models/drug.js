"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Drug extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Drug.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Drug name is required",
					},
					notNull: {
						msg: "Drug name is required",
					},
				},
			},
			stock: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Stock is required",
					},
					isNumeric: {
						msg: "Stock must be number",
					},
				},
			},
			price: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Price is required",
					},
					isNumeric: {
						msg: "Price must be number",
					},
				},
			},
		},
		{
			sequelize,
			modelName: "Drug",
		}
	);
	return Drug;
};
