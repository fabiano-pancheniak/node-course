const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
    name: String,
    company: String,
    price: Number,
    rating: Number
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product