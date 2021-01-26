const mongoose = require("../bin/mongodb");
const bcrypt = require("bcrypt");
const errorMessage = require("../util/errorMessage");
const validators = require("../util/validators");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, errorMessage.GENERAL.campo_obligatorio],
        trim: true
    },
    user: {
        type: String,
        unique: true,
        required: [true, errorMessage.GENERAL.campo_obligatorio],
        validate: {
            validator: async function (v) {
                const document = await this.model("usersAdmin").findOne({ user: v });
                if (document) {
                    return false;
                }
                return true;
            },
            message: errorMessage.USERSADMIN.userExist
        },

    },

    password: {
        type: String,
        required: [true, errorMessage.GENERAL.campo_obligatorio],
        validate: {
            validator: async function (v) {
                return validators.isGoodPassword(v); // función declarada en utils para validar el password
            },
            message: errorMessage.USERSADMIN.wrongPassword
        }
    }
});
//.pre => Middleware de mongoose - Previo a save, corre el middleware
userSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, 10); // pisa el password sin encriptar del objeto creado, con la encriptación de bcrypt.
    next();
});

//Método estático creado en el modelo
userSchema.statics.validateUser = async function (user, password){
    const userAdmin = await this.model("usersAdmin").findOne({user: user});
    if (userAdmin) {
        if (bcrypt.compareSync(password, userAdmin.password)) { //compareSync toma 2 parámetros, pass sin encriptar y pass encriptado, para chequear autenticación
            return {error: false, message: "User ok", userAdmin: userAdmin};
        } else {
            return {error: true, message: "Wrong password"};
        }
    } else {
        return {error: true, message: "Wrong user" };
    }   
}

module.exports = mongoose.model("usersAdmin", userSchema);