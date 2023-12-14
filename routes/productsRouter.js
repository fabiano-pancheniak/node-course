const express = require("express")
const router = express.Router()
const {authMiddleware} = require("../middlewares/auth")
const {getProducts, getProductById, createProduct, deleteProduct, updateProduct} = require("../controllers/productController")

router.route("/")
    .get(authMiddleware, getProducts)
    .post(createProduct)

router.route("/:id")
    .get(getProductById)
    .delete(deleteProduct)
    .patch(updateProduct)

module.exports = router
