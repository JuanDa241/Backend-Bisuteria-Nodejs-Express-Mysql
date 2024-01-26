const express = require('express')
const router = express.Router()
const { getAllworker, getworker ,createworker, updateworker ,deleteworker } = require('./worker.controller')
const { workerUpload } = require('../../config/multer')

router
        .get('/trabajadores', getAllworker)
        .get('/trabajadores/:idCardWorker', getworker)
        .post('/trabajador', workerUpload.single('photo'),createworker)
        .put('/trabajadores/:idCardWorker', updateworker)
        .delete('/trabajadores/:idCardWorker', deleteworker)

module.exports = router