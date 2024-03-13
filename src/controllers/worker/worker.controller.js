const WorkerModel = require('../../models/worker/worker.model')
const { hashPassword } = require('../../config/bcrypt');

//Obtener todos los trabajadores activos o inactivos
async function getActivateInactiveWorker(req,res) {
	try {
		const { idState } = req.params;
		const result = await WorkerModel.getActivateInactiveWorker(idState);
		res.json({ data: result });
	} catch (err) {
		console.log({ data: `Internal Server Error: ${err}` });
	}
};

//Controlador para mostrar la informacion de un trabajador
async function getWorker(req,res) {
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
async function profile(req,res) {
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
async function createWorker(req,res) {
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

//Actualizar la informacion de un trabajador
async function updateWorker(req, res) {
	const { idCardWorker } = req.params;
	const workerData = req.body;
	const photo = req.file ? req.file.path : null;

	try {
		const result = await WorkerModel.updateWorker(idCardWorker, workerData, photo);
		if (result.affectedRows === 0) {
			res.status(404).json({ error: `Error: worker with ID ${idCardWorker} not found` });
		} else {
			res.json({ data: `Worker with ID ${idCardWorker} has been updated successfully` });
		}
	} catch (error) {
		console.log({ data: `Internal Server Error: ${error}` });
		res.status(500).json({ error: `Internal Server Error: ${error}` });
	}
}

//Controlador que activa o inactiva un trabajador
async function activateInactiveWorker(req, res) {
	try {
		const { idCardWorker, idState } = req.params;
		const result = await WorkerModel.activateInactiveWorker(idCardWorker, idState);
		if (result.affectedRows === 0) {
			res.json({ data: 'Error' });
		} else {
			res.json({ data: result });
		}
	} catch (err) {
		console.log({ data: `Internal Server Error: ${err}` });
	}
}

module.exports = {
	getActivateInactiveWorker,
	getWorker,
	profile,
	createWorker,
	updateWorker,
	activateInactiveWorker 
};