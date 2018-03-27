const express = require('express')
const router = express.Router()
const passport = require('passport')
const config = require('../config/database')

const Product = require('../models/product')

// Add Product
router.post('/add', (req, res, next) => {
  let newProduct = new Product({
    productId: req.body.productId,
    name: req.body.name,
    category: req.body.category,
    quantity: req.body.quantity
  })

  Product.addProduct(newProduct, (err, user) => {
    if (err) {
      res.json({ success: false, msg: 'failed to add product' })
    } else {
      res.json({ success: true, msg: 'Product added' })
    }
  })
})

// // Profile
// router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
//   res.json({ user: req.user })
// })

module.exports = router
