const mongoose = require('mongoose')
const config = require('../config/database')

// Product schema
const ProductSchema = mongoose.Schema({
  productId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
})

const Product = module.exports = mongoose.model('Product', ProductSchema)

module.exports.getProductById = function(product, callback) {
  const query = {productId: productId}
  Product.findOne(query, callback)
}

module.exports.addProduct = function(newProduct, callback) {
  newProduct.save(callback)
}
