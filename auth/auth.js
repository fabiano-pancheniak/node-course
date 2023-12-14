const User = require("../models/User")
const asyncHandler = require("express-async-handler")
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcrypt');


exports.register = asyncHandler(async (req, res) => {
    let { login, password } = req.body

    bcrypt.hash(password, 10, async function(err, hash) {
        const user = await User.create({
            login: login,
            password: hash
        })
        res.status(201).json({user})
    })
})

exports.login = asyncHandler(async (req,res) => {
    const {login, password} = req.body
    const user = await User.findOne({login})

    
    bcrypt.compare(password, user.password, function(err, result) {
        if(!user){
            return res.status(404).json({message: "Something went wrong"})
        }

        if(result){
            const token = jwt.sign({ id: user._id, login: user.login }, process.env.JWTKEY);
            return res.status(200).json({user, token})
        }

        res.status(500).json({msg: "Error"})
    })    
})
