const express = require('express');
const bookController = require("../controllers/book")
const router = express.Router();

router.get("/getList/:begin/:end",bookController.getList);
router.post("/add",bookController.add);
router.patch("/update", bookController.update);
router.delete("/delete", bookController.deleteBook);

module.exports = router;