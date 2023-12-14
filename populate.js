require('dotenv').config()
const mongoose = require('mongoose')
const Product = require('./models/Product')
const jsonProducts = require('./products.json')

const start = async () => {
  try {
    await mongoose.connect(process.env.CONN)
    await Product.deleteMany()
    await Product.create(jsonProducts)
    console.log('Success!!!!')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()
