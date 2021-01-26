var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate-v2");

mongoose.connect("mongodb://localhost/pdPwa2020", {useNewUrlParser: true}, function (error){
    if (error){
        throw error;
    }else{
        console.log("Conectado a MongoDB");
    }
});

//Configuración de opciones generales de paginado
mongoosePaginate.paginate.options = {
    limit: 1,
    lean: false
}

//Le asigno a mongoose, el mongoosePaginate
mongoose.mongoosePaginate = mongoosePaginate;

module.exports = mongoose;