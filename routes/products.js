var express = require('express');
var router = express.Router();
var productsController = require("../controllers/productsController");
/* GET users listing. */
router.get('/', productsController.getAll);
router.get("/:id", productsController.getById);
//router.post("/", (req, res, next) => {req.app.validateUser(req, res, next)}, productsController.create); //Llamado a validateUser para verificar token solo en post de products
router.post("/", productsController.create);
router.put("/:id", productsController.update);
router.delete("/:id", productsController.delete)

module.exports = router;
