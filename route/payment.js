const express = require("express");
const { createCheckout } = require("../controller/payment");
const router = express.Router();

router.route('/create-checkout-session').post(createCheckout)

module.exports = router;