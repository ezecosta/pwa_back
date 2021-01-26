const usersWebModel = require("../models/usersWebModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    validate: async (req, res, next) => { //Login
        try {
            console.log(req.query);
            //const {} guarda el objeto deconstruido, sabiendo que el método al que llama devuelve un json
            const {error, message, userWeb} = await usersWebModel.validateUser(req.body.email, req.body.password); 
            if(!error){
                const token = jwt.sign({ userId: userWeb._id }, req.app.get("secretKey")); //req.app.get accede a cualq dato que se haya seteado en app.set
                res.json({ message: message, token: token });
                return;
            }
            res.json({ message: message});
        } catch (e) {
            next(e);
        }

    },
    create: async function (req, res, next) { //Registro
        try {
            console.log(req.body);
            const userWeb = new usersWebModel({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            const document = await userWeb.save();
            res.json(document);
        } catch (e) {
            next(e);
        }

    }
}