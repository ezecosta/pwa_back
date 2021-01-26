const productsModel = require("../models/productsModel");
const categoriesModel = require("../models/categoriesModel");

module.exports = {
    getAll: async (req, res, next) => {
        try {
            console.log(req.body.tokenData);
            //const products = await productsModel.find({}).populate("category"); //find solo, muestra el ID de category; populate(campo a mostrar) muestra el detalle del campo
            let queryFind={};
            if(req.query.search){
                queryFind={name:{$regex:".*"+req.query.search+".*",$options:"i"}}
            }
            console.log(queryFind)
            const products = await productsModel.paginate(queryFind,{
                sort: {name: 1},
                limit: req.query.limit || 3,
                populate: "category",
                page: req.query.page || 1 //page indica que pagina quiero que devuelva
            }); 
            res.status(200).json(products);
        } catch (e) {
            next(e);
        }


    },
    getById: async function (req, res, next) {
        try {
            console.log(req.params.id);
            //.select() entre paréntesis los campos que quiero recuperar
            const product = await (await productsModel.findById(req.params.id).select("name price"));
            if (!product) {
                res.status(200).json({ msg: "El producto no existe" });
                return; //Siempre después de un res con varias opciones de salida, para cortar la ejecuión
            }
            res.status(200).json(product);
        } catch (e) {
            next(e);
        }

    },
    create: async function (req, res, next) {
        try {
            const category = categoriesModel.findByIdAndValidate(req.body.category);
            if(category.error){
                res.json(categoria);
                return;
            }
            const product = new productsModel({
                name: req.body.name,
                sku: req.body.sku,
                description: req.body.description,
                price: req.body.price,
                quantity: req.body.quantity,
                category: req.body.category, //Id de la categoria con la cual se relaciona
                tags: req.body.tags
            });
            const document = await product.save();
            res.status(201).json(document);
        } catch (e) {
            console.log(e);
            e.status = 204; //Sale por el catch, guarda en e un status no content para que lo use el error handler de app.js
            next(e);
        }

    },
    update: async function (req, res, next) {
        try {
            console.log(req.params.id, req.body);
            const product = await productsModel.update({ _id: req.params.id }, req.body, { multi: false });
            res.status(200).json(product);
        } catch (e) {
            next(e);
        }

    },
    delete: async function (req, res, next) {
        try {
            console.log(req.params.id);
            const data = await productsModel.deleteOne({ _id: req.params.id });
            res.status(200).json(data);
        } catch (e) {
            next(e);
        }

    }
}