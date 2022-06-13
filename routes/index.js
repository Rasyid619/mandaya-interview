const router = require("express").Router();
const userRoutes = require("./user");
const drugRoutes = require("./drug");
const orderRoutes = require("./order");
const AdminAuth = require("../controllers/adminAuth");
const authentication = require("../middlewares/authentication");
const OrderController = require("../controllers/order");

router.post("/register", AdminAuth.adminRegister);
router.post("/login", AdminAuth.adminLogin);
router.get("/success", (req, res) => {
	res.status(200).json({ message: "Success" });
});
router.get("/orders", authentication, OrderController.getAllOrders);
router.use("/users", userRoutes);
router.use("/drugs", drugRoutes);
router.use("/orders", orderRoutes);

module.exports = router;
