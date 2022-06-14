const router = require("express").Router();
const DrugController = require("../controllers/drug");
const authentication = require("../middleware/authentication");
const { isAdmin } = require("../middleware/authorization");

router.get("/", DrugController.getAllDrugs);
router.post("/", authentication, isAdmin, DrugController.createDrug);
router.get("/:id", DrugController.getDrugById);
router.patch("/:id", authentication, isAdmin, DrugController.restockDrug);
router.delete("/:id", authentication, isAdmin, DrugController.deleteDrug);

module.exports = router;
