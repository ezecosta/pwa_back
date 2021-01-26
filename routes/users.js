var express = require('express');
var router = express.Router();
const usersAdminController = require("../controllers/usersAdminController");
const usersWebController = require("../controllers/usersWebController");


router.post("/register", usersAdminController.create);
router.post("/login", usersAdminController.validate);
router.post("/web/register", usersWebController.create);
router.post("/web/login", usersWebController.validate);



module.exports = router;
