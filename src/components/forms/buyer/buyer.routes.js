const express = require("express");
const router = express.Router()
const { createClient, getClient, updateClient } = require("./buyer.controller");



router
        .post('/cliente', createClient)
        .get('/cliente/:idCardClient', getClient)
        .put('/cliente/:idCardClient', updateClient)



module.exports = router