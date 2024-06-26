const express = require('express');
const bookController = require("../controllers/book")
const router = express.Router();

router.post("/",bookController.add);
router.patch("/", bookController.update);
router.delete("/", bookController.deleteBook);

module.exports = router;