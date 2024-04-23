const express = require('express');
const bookController = require("../controllers/book")
const router = express.Router();

router.get("/getList/:begin/:end",bookController.getList);
router.post("/add",bookController.add);
router.post("/update", bookController.update);

module.exports = router;