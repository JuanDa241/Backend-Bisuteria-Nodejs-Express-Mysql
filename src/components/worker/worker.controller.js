const db = require('../../dataBase/db')
const { hashPassword } = require('../../config/bcrypt');

//Obtener lista de la base de datos
const getAllworker = (req,res) =>{
    try {
        let sql = 'SELECT * FROM worker'
        db.query(sql,(err,rows,field) =>{
            if(!err){
                if(rows.length < 1){
                    res.json({data: `Error no found worker`})
                } else {
                    res.json({data: rows})
                }
            } else {
                throw err
            }
        })
    } catch (err) {
        console.log({data: `Internal Server Error: ${err}`})
    }
};

 //Obtener un detalle
const getworker = (req,res) =>{
    const { idCardWorker } = req.params

    try {
        let sql = 'SELECT * FROM worker WHERE idCardWorker = ?'
        db.query(sql,idCardWorker,(err,rows,field) =>{
            if(!err){
                if(rows.length < 1){
                    res.json({data: `Error no found workers`})
                } else {
                    res.json({data: rows})
                }
            } else {
                throw err
            }
        })  
    } catch (err) {
        console.log({data: `Internal Server Error: ${err}`})
    }
};

//Insertar un registro
const createworker = async (req, res) => {
    try {
    const { idCardWorker, workerName, workerLastName, workerEmail, workerPhone, userName, password, idRole, numberBank, idBank } = req.body;
    const photo = req.file ? req.file.path : null;

    // Hashear la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await hashPassword(password);

    const worker = {
        idCardWorker: idCardWorker,
        workerName: workerName,
        workerLastName: workerLastName,
        workerEmail: workerEmail,
        workerPhone: workerPhone,
        userName: userName,
        password: hashedPassword, 
        photo: photo,
        idRole: idRole,
        numberBank: numberBank,
        idBank: idBank
    };

    const sql = 'INSERT INTO worker(idCardWorker, workerName, workerLastName, workerEmail, workerPhone, userName, password, photo, idRole, numberBank, idBank) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(sql, [worker.idCardWorker, worker.workerName, worker.workerLastName, worker.workerEmail, worker.workerPhone, worker.userName, worker.password, worker.photo, worker.idRole, worker.numberBank, worker.idBank], (err, result) => {
        if (err) {
            throw err
        // console.log({ data: `error id: ${err}` });
        // res.status(500).json({ error: 'Internal Server Error' });
        } else {
        res.json({ data: result });
        }
    });
    } catch (error) {
        console.log({ data: `Internal Server Error: ${error}` });
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//Actualizar un registro
const updateworker = (req,res) =>{
    const { idCardWorker, workerName, workerLastName, workerEmail, workerPhone, userName, password, photo, idRole  } = req.body;

    try {
        const sql = 'UPDATE worker SET workerName = ?, workerLastName = ?, workerEmail = ?, workerPhone = ?, userName = ?, password = ?, photo = ?, idRole = ?  WHERE idCardWorker = ?';
        db.query(sql, [workerName, workerLastName, workerEmail, workerPhone, userName, password, photo, idRole], (err, result) => {
            if (err) {
                throw err;
            } else {
                if (result.affectedRows === 0) {
                    res.json({ data: `Error: worker with ID ${idCardWorker} not found` });
                } else {
                    res.json({ data: `worker with ID ${idCardWorker} has been updated successfully` });
                }
            }
        });
    } catch (error) {
        console.log({ data: `Internal Server Error: ${error}` });
    }
};

//Eliminar un registro
const deleteworker = (req,res) =>{
    const { idCardWorker } = req.params

    try {
        let sql = 'DELETE FROM worker WHERE idCardWorker = ?'
        db.query(sql,idCardWorker,(err,result,field) =>{
            if(!err){
                if(result.affectedRows === 0){
                    res.json({data: `Error: worker with ID: ${idCardWorker} not found`})
                } else {
                    res.json({data: result})
                }
            } else {
                throw err
            }
        })  
    } catch (err) {
        console.log({data: `Internal Server Error: ${err}`})
    }
};

module.exports = {
    getAllworker,
    getworker,
    createworker,
    updateworker,
    deleteworker
};