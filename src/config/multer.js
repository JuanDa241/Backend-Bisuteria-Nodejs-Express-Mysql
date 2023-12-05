const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDirectoty = 'uploads';

const productStorage = multer.diskStorage({
    destination: function(req,file,cb) {
        const productUploadDirectory = path.join(uploadDirectoty, 'products');
        if(!fs.existsSync(productUploadDirectory)){
            fs.mkdirSync(productUploadDirectory, { recursive:true });
        }
        cb(null, productUploadDirectory);
    },
    filename: function(req,file,cb) {
        cb(null, Date.now() + 'IRis'+ file.originalname);
    }
});

const productUpload = multer({storage: productStorage})

const workerStorage = multer.diskStorage({
    destination: function(req,file,cb) {
        const workerUploadDirectory = path.join(uploadDirectoty, 'workers');
        if(!fs.existsSync(workerUploadDirectory)){
            fs.mkdirSync(workerUploadDirectory, { recursive:true })
        }
        cb(null, workerUploadDirectory)
    },
    filename: function(req,file,cb) {
        cb(null, Date.nowI() + 'IRisWorker'+ file.originalname)
    }
});

const workerUpload = multer({ storage:workerStorage });

module.exports = {
    productUpload,
    workerUpload
}