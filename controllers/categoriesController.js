const categoriesModel = require("../models/categoriesModel");

module.exports = {
        getAll: async (req, res, next) =>{
            const categories = await categoriesModel.find({});
            res.json(categories);
        },
        create: function(req, res, next){
            const category = new categoriesModel({
                name: req.body.name
            });
            category.save();
            res.json(category);
        }
}