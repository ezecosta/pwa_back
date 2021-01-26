const mongoose = require("../bin/mongodb");

const categorySchema = new mongoose.Schema({
    name: String
});

//Método estático para validar que la categoría exista
categorySchema.statics.findByIdAndValidate = async function (id){
    const document = await this.findById(id);
    if(!document){
        res.json({error: true, message: "Category doesn't exist"});
    }
    return document;
}

module.exports = mongoose.model("categories", categorySchema);