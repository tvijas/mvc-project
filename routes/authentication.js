const express = require('express');
const authenticationController = require("../controllers/authentication")
const router = express.Router();

router.use(authenticationController.authenticate)

module.exports = router;

