const Product = require("../models/Product")
const mongoose = require('mongoose')
const asyncHandler = require("express-async-handler")
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.getProducts = asyncHandler(async (req,res) => {
        const { company, rating, sort} = req.query;
        const queryObject = {};
    
        if(req.query.company){
            queryObject.company = company
        }
        
        if(req.query.rating){
            queryObject.rating = {$gte: rating}
        }
    
        let result = Product.find(queryObject)
    
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        const skip = (page - 1) * limit
      
        result = result.skip(skip).limit(limit).sort(`${sort}`)
    
        const products = await result;
        res.status(200).json({ products, nbHits: products.length, page: page })   
})

exports.getProductById = asyncHandler(async (req,res) => {
    const productID = req.params.id
    
    if(!mongoose.Types.ObjectId.isValid(productID)){   
        return res.status(404).json({message: `Product ${productID} not found`})
    }
    
    const product = await Product.findOne({_id: productID})
    
    if(!product){
        return res.status(404).json({message: `Product ${productID} not found`})
    }

    res.status(200).json({product})
})

exports.createProduct = asyncHandler(async (req, res) => {
    const product = await Product.create(req.body)
    res.status(201).json({product})
})

exports.deleteProduct = asyncHandler(async(req,res) => {
    const productID = req.params.id
    
    if(!mongoose.Types.ObjectId.isValid(productID)){
        return res.status(404).json({message: `Product ${productID} not found`})
    }
    
    await Product.findOneAndDelete({_id: productID})
    res.status(200).send()
})

exports.updateProduct = asyncHandler(async(req,res) => {
    const productID = req.params.id

    if(!mongoose.Types.ObjectId.isValid(productID)){   
        return res.status(404).json({message: `Product ${productID} not found`})
    }

    let product = await Product.findOneAndUpdate({_id: productID}, req.body, {new: true})

    if(!product){
        return res.status(404).json({message: `Product ${productID} not found`})
    }

    res.status(201).json(product)
})

