const express = require("express");
const router = express.Router();
const authValidations = require('../middlewares/AuthValidations');
const userServices = require("./userServices");

router.post("/register", authValidations.signupValidation, userServices.signup );
router.post("/login", authValidations.loginValidation, userServices.login );

module.exports = router;