var express = require('express');
var router = express.Router();
var salesController = require("../controllers/salesController");

router.get("/", salesController.getAll);
router.post("/", salesController.create);

module.exports = router;