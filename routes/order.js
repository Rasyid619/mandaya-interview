const router = require("express").Router();
const OrderController = require("../controllers/order");
const authentication = require("../middlewares/authentication");

router.post("/payment", authentication, OrderController.payment);

module.exports = router;
