const router = require("express").Router();
const UserController = require("../controllers/user");
const OrderController = require("../controllers/order");
const authentication = require("../middlewares/authentication");

router.post("/register", UserController.userRegister);
router.post("/login", UserController.userLogin);
router.post("/orders", authentication, OrderController.createOrder);
router.get("/orders", authentication, OrderController.getAllOrders);

module.exports = router;
