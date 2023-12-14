const express = require("express")
const router = express.Router()
const {register, login} = require("../auth/auth")


router.route("/register")
.post(register)

router.route("/login")
.get(login)

module.exports = router
