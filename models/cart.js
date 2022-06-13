"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Cart extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Cart.belongsTo(models.User, { foreignKey: "UserId" });
			Cart.belongsTo(models.Drug, { foreignKey: "DrugId" });
		}
	}
	Cart.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			DrugId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						msg: "DrugId is required",
					},
				},
			},
			UserId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						msg: "UserId is required",
					},
				},
			},
			status: {
				type: DataTypes.STRING,
				defaultValue: "pending",
				allowNull: false,
				validate: {
					notNull: {
						msg: "status is required",
					},
				},
			},
			quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						msg: "quantity is required",
					},
				},
			},
		},
		{
			sequelize,
			modelName: "Cart",
		}
	);
	return Cart;
};
