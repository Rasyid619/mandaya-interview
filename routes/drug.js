const router = require("express").Router();
const DrugController = require("../controllers/drug");

router.get("/", DrugController.getAllDrugs);
router.post("/", DrugController.createDrug);
router.get("/:id", DrugController.getDrugById);
router.patch("/:id", DrugController.restockDrug);
router.delete("/:id", DrugController.deleteDrug);

module.exports = router;
