const db = require('../../../dataBase/db');

const allCategory = (req, res) => {
	try {
		let sql = 'SELECT * FROM category'
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

//Filtrar por categoria
const filterCategory = (req, res) => {
	const { idCategory } = req.body
	try {
		let sql = 'SELECT * FROM products WHERE idCategory = ?'
		db.query(sql, idCategory, (err, rows, field) => {
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

module.exports = {
	allCategory,
	filterCategory
}