const { mongo } = require("../bin/mongodb");
const mongoose = require("../bin/mongodb");
const errorMessage = require("../util/errorMessage");
const Schema = mongoose.Schema;

var productSchema = new Schema({
    product_id: {
        type:Schema.ObjectId,
        ref:"products"
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const paymentSchema = new Schema({
    amount: {
        type: Number,
        required: [true, "Mandatory field"],
        trim: true,
      },
      method: {
        type: String,
        enum: ["mercadopago","efectivo"],
        required: [true, "Mandatory field"],
        trim: true,
      },
      status: {
        type: String,
        enum: ["generate", "pending", "inProcess", "approved", "cancelled", "rejected"],
        required: [true, "Mandatory field"],
        trim: true,
      }

})

const salesSchema = new mongoose.Schema({
    products: [productSchema],
    payment: paymentSchema,

    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    total: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: "users"
    }
});


module.exports = mongoose.model("sales", salesSchema);
