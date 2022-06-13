const { Cart, Drug } = require("../models");
const axios = require("axios");

class OrderController {
	static async getAllOrders(req, res, next) {
		try {
			const { role, id } = req.userLogin;
			let orders;
			if (role == "admin") {
				orders = await Cart.findAll();
			} else {
				orders = await Cart.findAll({
					where: {
						UserId: id,
					},
				});
			}
			res.status(200).json(orders);
		} catch (err) {
			next(err);
		}
	}

	static async createOrder(req, res, next) {
		try {
			const { DrugId, quantity } = req.body;
			const findOneMed = await Drug.findByPk(DrugId);
			if (!findOneMed) {
				throw {
					code: 404,
					message: "Drug not found",
				};
			}
			if (findOneMed.stock < quantity) {
				throw {
					code: 400,
					message: "Not enough stock",
				};
			}
			const order = await Cart.create({
				UserId: req.userLogin.id,
				DrugId,
				quantity,
			});
			res
				.status(201)
				.json({ message: "Order created successfully", data: order });
		} catch (err) {
			next(err);
		}
	}

	static async payment(req, res, next) {
		try {
			const cart = await Cart.findAll({
				where: {
					UserId: req.userLogin.id,
					status: "pending",
				},
				include: [
					{
						model: Drug,
						attributes: ["name", "price", "stock"],
					},
				],
			});
			if (!cart.length) {
				throw {
					code: 404,
					message: "Cart is empty",
				};
			}

			let total = 0;
			cart.forEach((item) => {
				total += item.quantity * item.Drug.price;
			});
		} catch (err) {
			next(err);
		}
	}
}

module.exports = OrderController;
