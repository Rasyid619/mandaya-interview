const { Cart, Drug } = require("../models");
const xendit = require("xendit-node");
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
					name: "Not Found",
					code: 404,
					message: "Drug not found",
				};
			}
			if (findOneMed.stock < quantity) {
				throw {
					name: "Not Found",
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
			const secret = new xendit({
				secretKey: process.env.XENDIT_SECRET,
			});
			const { Invoice } = secret;
			const invoiceSpecificOptions = {};
			const invoice = new Invoice(invoiceSpecificOptions);
			const response = await invoice.createInvoice({
				externalID: "Medicine recipe" + new Date(),
				amount: total,
				description: "UserId: " + req.userLogin.id,
				invoiceDuration: 86400,
				customer: {
					email: "arifinrasyid13@gmail.com",
				},
				customer_notification_preference: {
					invoice_created: ["email"],
					invoice_reminder: ["email"],
				},
				shouldSendEmail: true,
				successRedirectURL: "http://localhost:3000/success",
			});
			const updated = await cart.forEach((item) => {
				Drug.update(
					{
						status: "paid",
						stock: item.Drug.stock - item.quantity,
					},
					{
						where: {
							id: item.DrugId,
						},
					}
				);
			});
			res.status(201).json({ message: "Payment success", data: response });
		} catch (err) {
			next(err);
		}
	}
}

module.exports = OrderController;
