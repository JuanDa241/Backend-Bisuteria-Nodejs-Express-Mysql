const express = require('express')
const router = express.Router()
const { getAllworker, getworker ,createworker, updateworker ,deleteworker, profile } = require('./worker.controller')
const { workerUpload } = require('../../config/multer')

router
        .get('/trabajadores', getAllworker)
        .get('/trabajadores/:idCardWorker', getworker)
        .post('/trabajador', workerUpload.single('photo'),createworker)
        .put('/trabajadores/:idCardWorker', workerUpload.single('photo'), updateworker)
        .delete('/trabajadores/:idCardWorker', deleteworker)
        .get('/perfil/:idCardWorker', profile)

module.exports = router