const db = require('../../dataBase/db')
const { hashPassword, comparePassword  } = require('../../config/bcrypt');
const jwt = require('../../config/jwt'); // Importa el módulo JWT


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
}

 //Obtener un detalle
const getworker = (req,res) =>{
    const { idCardWorker } = req.body

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
}

//Insertar un registro
const createworker = async (req, res) => {
    try {
    const { idCardWorker, workerName, workerLastName, workerEmail, workerPhone, userName, password, idRole } = req.body;
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
        idRole: idRole
    };

    const sql = 'INSERT INTO worker(idCardWorker, workerName, workerLastName, workerEmail, workerPhone, userName, password, photo, idRole) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(sql, [worker.idCardWorker, worker.workerName, worker.workerLastName, worker.workerEmail, worker.workerPhone, worker.userName, worker.password, worker.photo, worker.idRole], (err, result) => {
        if (err) {
        console.log({ data: `error id: ${err}` });
        res.status(500).json({ error: 'Internal Server Error' });
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
}

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
}

//Obtener un detalle (iniciar sesión)
const inicioSesion = async (req, res) => {
    const { userName, password } = req.body;
  
    try {
      let sql = 'SELECT * FROM worker WHERE userName = ?';
      db.query(sql, userName, async (err, rows) => {
        if (!err) {
          if (rows.length < 1) {
            res.json({ data: 'Usuario no encontrado' });
          } else {
            const storedHashedPassword = rows[0].password;
            const isPasswordMatch = await comparePassword(password, storedHashedPassword);
  
            if (isPasswordMatch) {
              // Contraseña válida, genera un token JWT
              const idCardWorker = rows[0].idCardWorker; 
              const idRole = rows[0].idRole;
              const token = jwt.generateJwtToken(idCardWorker, idRole);
  
              // Devuelve el token en la respuesta
              res.json({ data: 'Inicio de sesión exitoso', token });
            } else {
              // Contraseña inválida
              res.status(401).json({ error: 'Credenciales incorrectas' });
            }
          }
        } else {
          throw err;
        }
      });
    } catch (err) {
      console.log({ data: `Internal Server Error: ${err}` });
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports = {
    getAllworker,
    getworker,
    createworker,
    updateworker,
    deleteworker,
    inicioSesion
}