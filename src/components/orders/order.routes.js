const express = require('express');
const { createOrder } = require('./orders.controller');
const router = express.Router();


router
      .post('/orden', createOrder)

module.exports = router;