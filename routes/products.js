const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('../config/database')

const Product = require('../models/product')

const AWS = require('aws-sdk')

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

// Get catalog
router.get('/catalog', (req, res, next) => {
  Product.getCatalog((err, products) => {
    if (err) throw err
    if (!products) {
      return res.json({ success: false, msg: 'Catalog is empty' })
    }

    let productsMap = []

    products.forEach(function(product) {
      // productsMap[product.productId] = product
      productsMap.push(product)
    })

    res.json({
      success: true,
      catalog: productsMap
    })
  })
})

// Get Product by ID
router.get('/product/id/:id', (req, res, next) => {
  Product.getProductById(req.params.id, (err, product) => {
    if (err) throw err
    if (!product) {
      return res.json({ success: false, msg: 'Product not found' })
    }
    res.json({
      success: true,
      product: {
        productId: product.productId,
        name: product.name
      }
    })
  })
})

// Upload file
router.post('/upload', (req, res, next) => {
  const spacesEndpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com')
  const s3 = new AWS.S3({
    endpoint: spacesEndpoint
  })
  let params = {
    Body: "The contents of the file",
    Bucket: "darren-test",
    Key: "file6.txt"
  }

  s3.putObject(params, function(err, data) {
    if (err) console.log(err, err.stack)
    else {
      console.log(data)
      res.json({
        success: true,
        msg: 'File uploaded'
      })
    }
  })
})

module.exports = router
