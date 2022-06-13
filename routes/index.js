const router = require("express").Router();
const adminRoutes = require("./admin");
const userRoute = require("./user");
const drugRoute = require("./drug");

router.use("/admin", adminRoutes);
router.use("/user", userRoute);
router.use("/drug", drugRoute);

module.exports = router;
