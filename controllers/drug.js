const { Drug } = require("../models");

class DrugController {
	static async getAllDrugs(req, res, next) {
		try {
			const drugs = await Drug.findAll();
			res.status(200).json(drugs);
		} catch (err) {
			next(err);
		}
	}

	static async createDrug(req, res, next) {
		try {
			const { name, description, price, stock } = req.body;
			const drug = await Drug.create({
				name,
				description,
				price,
				stock,
			});
			res.status(201).json(drug);
		} catch (err) {
			next(err);
		}
	}

	static async restockDrug(req, res, next) {
		try {
			const { id } = req.params;
			const { stock } = req.body;
			const drug = await Drug.findByPk(id);
			if (!drug) {
				return res.status(404).json({
					message: "Drug not found",
				});
			}
			const newStock = drug.stock + stock;
			const updatedDrug = await drug.update({
				stock: newStock,
			});
			res.status(200).json(updatedDrug);
		} catch (err) {
			next(err);
		}
	}

	static async deleteDrug(req, res, next) {
		try {
			const { id } = req.params;
			const drug = await Drug.findByPk(id);
			if (!drug) {
				return res.status(404).json({
					message: "Drug not found",
				});
			}
			await drug.destroy({ where: { id } });
			res.status(200).json({
				message: "Drug deleted",
			});
		} catch (err) {
			next(err);
		}
	}

	static async getDrugById(req, res, next) {
		try {
			const { id } = req.params;
			const drug = await Drug.findByPk(id);
			if (!drug) {
				return res.status(404).json({
					message: "Drug not found",
				});
			}
			res.status(200).json(drug);
		} catch (err) {
			next(err);
		}
	}
}

module.exports = DrugController;
