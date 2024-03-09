const db = require('../../dataBase/db')
const WorkerModel = require('../../models/worker/worker.model')
const { hashPassword } = require('../../config/bcrypt');

//Obtener todos los trabajadores activos o inactivos
async function getActivateInactiveWorker(req, res) {
	try {
		const { idState } = req.params;
		const result = await WorkerModel.getActivateInactiveWorker(idState);res.json({ data: result });
	} catch (err) {
		console.log({ data: `Internal Server Error: ${err}` });
	}
};

//Controlador para mostrar la informacion de un trabajador
async function getworker(req, res) {
	try {
		const { idCardWorker } = req.params;
		const infoWorker = await WorkerModel.getWorker(idCardWorker);
		if (infoWorker.length < 1) {
			res.json({ data: 'Error no found worker' })
		} else {
			res.json({ data: infoWorker });
		}
	} catch (err) {
		console.log({ data: `Internal Server Error: ${err}` });
	}
}

//Controlador para obtener el perfil de un trabjador
async function profile(req, res) {
	try {
		const { idCardWorker } = req.params;
		const workerProfile = await WorkerModel.getProfileWorker(idCardWorker);
		if (workerProfile.length < 1) {
			res.json({ data: `Error no found worker` });
		} else {
			res.json({ data: workerProfile });
		}
	} catch (errQ) {
		console.log({ data: `Internal Server Error: ${err}` });
	}
};

//Controlador para insertar un nuevo trabajador a la base de datos
async function createworker(req, res) {
	try {
		const { idCardWorker, workerName, workerLastName, workerEmail, workerPhone, userName, password, idRole, numberBank, idBank } = req.body;
		const photo = req.file ? req.file.path : null;

		// Hashear la contraseña antes de almacenarla en la base de datos
		const hashedPassword = await hashPassword(password);

		const workerInfo = {
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

		const result = await WorkerModel.createWorker(workerInfo);
		res.json({ data: result });
	} catch (error) {
		console.log({ data: `Internal Server Error: ${error}` });
		res.status(500).json({ error: 'Internal Server Error' });
	}
}

//Actualizar un registro
const updateworker = (req, res) => {
	const { idCardWorker } = req.params;
	const { workerName, workerLastName, workerEmail, workerPhone, userName, password, numberBank, idBank } = req.body;
	const photo = req.file ? req.file.path : null;

	try {
		const updateSql = 'UPDATE worker SET workerName = ?, workerLastName = ?, workerEmail = ?, workerPhone = ?, userName = ?, password = ?, numberBank = ?, idBank =? WHERE idCardWorker = ?';

		const updateImageSql = 'UPDATE worker SET workerName = ?, workerLastName = ?, workerEmail = ?, workerPhone = ?, userName = ?, password = ?, photo = ?, numberBank = ?, idBank = ? WHERE idCardWorker = ?';

		const sql = req.file ? updateImageSql : updateSql;

		const params = req.file ? [workerName, workerLastName, workerEmail, workerPhone, userName, password, photo, numberBank, idBank, idCardWorker] : [workerName, workerLastName, workerEmail, workerPhone, userName, password, numberBank, idBank, idCardWorker]

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

//Controlador que activa o inactiva un trabajador
const activateInactiveWorker = (req, res) => {
	try {
		const { idCardWorker, idState } = req.params
		const result = WorkerModel.activateInactiveWorker(idCardWorker, idState);
		res.json({ data: result });
	} catch (err) {
		console.log({ data: `Internal Server Error: ${err}` })
	}
};

module.exports = {
	getActivateInactiveWorker,
	getworker,
	profile,
	createworker,
	updateworker,
	activateInactiveWorker 
};