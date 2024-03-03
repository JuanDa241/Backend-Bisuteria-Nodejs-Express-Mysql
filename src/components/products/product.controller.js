const db = require('../../dataBase/db')
const ids = require('../../config/ids')

//Obtener lista de la base de datos
const getAllProduct = (req, res) => {
	try {
		let sql = 'SELECT * FROM products'
		db.query(sql, (err, rows, field) => {
			if (!err) {
				res.json({ data: rows })
			} else {
				throw err
			}
		});
	} catch (err) {
		console.log({ data: `Internal Server Error: ${err}` })
	}
};

//Obtener un detalle
const getProduct = (req, res) => {
	const { idProduct } = req.params;

	try {
		let sql = 'SELECT * FROM products WHERE idProduct = ?';
		db.query(sql, idProduct, (err, rows, field) => {
			if (!err) {
				if (rows.length < 1) {
					res.json({ data: `Error no found products` })
				} else {
					res.json({ data: rows })
				}
			} else {
				throw err
			}
		});
	} catch (err) {
		console.log({ data: `Internal Server Error: ${err}` })
	}
};

//Insertar un registro
const createProduct = (req, res) => {
	const { nameProduct, price, laborPrice, idCategory } = req.body
	const image = req.file ? req.file.path : null

	const table = 'products'
	const condicion = 'idProduct'

	ids(table, condicion, (idProduct, err) => {
		if (err) {
			console.log({ data: `error id: ${err}` })
		}
		const product = {
			idProduct: idProduct,
			nameProduct: nameProduct,
			price: price,
			laborPrice: laborPrice,
			image: image,
			idCategory: idCategory
		};

		try {
			const sql = 'INSERT INTO products(idProduct, nameProduct, price, laborPrice, image, idCategory) VALUES (?,?,?,?,?,?)'
			db.query(sql, [product.idProduct, product.nameProduct, product.price, product.laborPrice, product.image, product.idCategory], (err, result) => {
				if (err) {
					throw err
				} else {
					res.json({ data: result })
				}
			});
		} catch (error) {
			console.log({ data: `Internal Server Error: ${err}` })
		}
	});
};

//Actualizar un registro
const updateProduct = (req, res) => {
	const { idProduct } = req.params
	const { nameProduct, price, laborPrice, idCategory } = req.body;
	const image = req.file ? req.file.path : null

	try {
		const updateSql = 'UPDATE products SET nameProduct = ?, price = ?, laborPrice = ?, idCategory = ? WHERE idProduct = ?';
    
    const updateImageSql = 'UPDATE products SET nameProduct = ?, price = ?, laborPrice = ?, image = ?, idCategory = ? WHERE idProduct = ?';

    const sql = req.file ? updateImageSql : updateSql;

    const params = req.file ? [nameProduct, price, laborPrice, image, idCategory, idProduct] : [nameProduct, price, laborPrice, idCategory, idProduct];

    db.query(sql, params, (err, result) => {
			if (err) {
				throw err;
			} else {
				if (result.affectedRows === 0) {
					res.json({ data: `Error: Product with ID ${idProduct} not found` });
				} else {
					res.json({ data: `Product with ID ${idProduct} has been updated successfully` });
				}
			}	
		});
	} catch (error) {
		console.log({ data: `Internal Server Error: ${error}` });
	};
};

//Eliminar un registro
const deleteProduct = (req, res) => {
	const { idProduct } = req.params

	try {
		let sql = 'DELETE FROM products WHERE idProduct = ?'
		db.query(sql, idProduct, (err, result, field) => {
			if (!err) {
				if (result.affectedRows === 0) {
					res.json({ data: `Error: Product with ID: ${idProduct} not found` })
				} else {
					res.json({ data: result })
				}
			} else {
				throw err
			}
		});
	} catch (err) {
		console.log({ data: `Internal Server Error: ${err}` })
	};
};

module.exports = {
	getAllProduct,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct
};