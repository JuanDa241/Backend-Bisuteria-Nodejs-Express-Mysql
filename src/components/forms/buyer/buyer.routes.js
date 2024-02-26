const express = require("express");
const router = express.Router()
const { createClient } = require("./buyer.controller");



router
        .post('/cliente', createClient)



module.exports = router