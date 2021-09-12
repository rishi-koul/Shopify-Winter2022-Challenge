const { Router } = require("express");
const { AuthController } = require("../controllers");

const router = Router();

router.post("/login/", AuthController.login);
router.post("/signup", AuthController.signup);
router.post("/logout", AuthController.logout);

module.exports = router;
