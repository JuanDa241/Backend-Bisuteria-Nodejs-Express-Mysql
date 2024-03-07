const db = require('../../dataBase/db')
const { hashPassword } = require('../../config/bcrypt');

//Obtener lista de la base de datos
const getAllworker = (req, res) => {
	try {
		let sql = 'SELECT * FROM worker WHERE idState = 4'
		db.query(sql, (err, rows, field) => {
			if (!err) {
					res.json({ data: rows })
			} else {
				throw err
			}
		})
	} catch (err) {
		console.log({ data: `Internal Server Error: ${err}` })
	}
};

//Obtener un detalle
const getworker = (req, res) => {
	const { idCardWorker } = req.params

	try {
		let sql = 'SELECT * FROM worker WHERE idCardWorker = ?'
		db.query(sql, idCardWorker, (err, rows, field) => {
			if (!err) {
				if (rows.length < 1) {
					res.json({ data: `Error no found workers` })
				} else {
					res.json({ data: rows })
				}
			} else {
				throw err
			}
		})
	} catch (err) {
		console.log({ data: `Internal Server Error: ${err}` })
	}
};

//Informacion para el perfil de un trabjador en la pantalla de bienvenida
const profile = async (req,res) => {
	const { idCardWorker } = req.params

	try {
		let sql = 'SELECT W.idCardWorker, W.workerName, W.workerLastName, W.userName, W.workerEmail, W.workerPhone, W.photo, W.numberBank ,R.roles, B.banks FROM worker W INNER JOIN role R on W.idRole = R.idRole INNER JOIN bank B ON W.idBank = B.idBank WHERE idCardWorker = ?'
	
		db.query(sql, idCardWorker, (err, rows, field) => {
			if (!err) {
				if (rows.length < 1) {
					res.json({ data: `Error no found workers` })
				} else {
					res.json({ data: rows })
				}
			} else {
				throw err
			}
		})
	} catch (errQ) {
		console.log({ data: `Internal Server Error: ${err}` })
	}
};

//Informacion para listar a todos los trabajadores
const listWorker = (req, res) => {
	try {
		let sql = 'SELECT W.idCardWorker, W.workerName, W.workerLastName, W.photo, W.workerPhone, R.roles FROM worker W INNER JOIN role R on W.idRole = R.idRole'
		db.query(sql, (err, rows, field) => {
			if (!err) {
				if (rows.length < 1) {
					res.json({ data: `Error no found worker` })
				} else {
					res.json({ data: rows })
				}
			} else {
				throw err
			}
		})
	} catch (err) {
		console.log({ data: `Internal Server Error: ${err}` })
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
			idBank: idBank,
			idSate: "4"
		};

		const sql = 'INSERT INTO worker(idCardWorker, workerName, workerLastName, workerEmail, workerPhone, userName, password, photo, idRole, numberBank, idBank, idState) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

		db.query(sql, [worker.idCardWorker, worker.workerName, worker.workerLastName, worker.workerEmail, worker.workerPhone, worker.userName, worker.password, worker.photo, worker.idRole, worker.numberBank, worker.idBank, worker.idSate], (err, result) => {
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
const updateworker = (req, res) => {
	const { idCardWorker } = req.params;
	const { workerName, workerLastName, workerEmail, workerPhone, userName, password, numberBank, idBank } = req.body;
	const photo = req.file ? req.file.path : null;

	try {
		const updateSql = 'UPDATE worker SET workerName = ?, workerLastName = ?, workerEmail = ?, workerPhone = ?, userName = ?, password = ?, numberBank = ?, idBank =? WHERE idCardWorker = ?';

		const updateImageSql = 'UPDATE worker SET workerName = ?, workerLastName = ?, workerEmail = ?, workerPhone = ?, userName = ?, password = ?, photo = ?, numberBank = ?, idBank = ? WHERE idCardWorker = ?';

		const sql = req.file ? updateImageSql : updateSql;

		const params = req.file ? [workerName, workerLastName,workerEmail, workerPhone, userName, password, photo, numberBank, idBank, idCardWorker] : [workerName, workerLastName,workerEmail, workerPhone, userName, password, numberBank, idBank, idCardWorker]

		db.query(sql, params, (err, result) => {
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
const deleteworker = (req, res) => {
	const { idCardWorker } = req.params

	try {
		let sql = 'DELETE FROM worker WHERE idCardWorker = ?'
		db.query(sql, idCardWorker, (err, result, field) => {
			if (!err) {
				if (result.affectedRows === 0) {
					res.json({ data: `Error: worker with ID: ${idCardWorker} not found` })
				} else {
					res.json({ data: result })
				}
			} else {
				throw err
			}
		})
	} catch (err) {
		console.log({ data: `Internal Server Error: ${err}` })
	}
};

module.exports = {
	getAllworker,
	getworker,
	profile,
	listWorker,
	createworker,
	updateworker,
	deleteworker
};