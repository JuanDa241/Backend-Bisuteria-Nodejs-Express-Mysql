const db = require('../../dataBase/db')
const ids = require('../../config/ids');
const ProductModel = require('../../models/products/product.model');

//Obtener todos los productos activos
async function getActivateInactiveProduct(req, res) {
	try {
		const { idState } = req.params;
		const result = await ProductModel.getActivateInactiveProduct(idState);
		res.json({ data: result });
	} catch (err) {
		console.log({ data: `Internal Server Error: ${err}` });
	}
}

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

//Controlador para insertar un nuevo producto a la base de datos
async function createProduct(req, res) {
	try {
		const { nameProduct, price, laborPrice, idCategory } = req.body;
		const image = req.file ? req.file.path : null;

		const table = 'products';
		const condicion = 'idProduct';

		ids(table, condicion, async (idProduct, err) => {
			if (err) {
				console.log({ data: `error id: ${err}` });
				return res.status(500).json({ error: 'Internal Server Error' });
			}
			const infoProduct = {
				idProduct: idProduct,
				nameProduct: nameProduct,
				price: price,
				laborPrice: laborPrice,
				image: image,
				idCategory: idCategory,
				idState: "4"
			};

			try {
				const result = await ProductModel.createProduct(infoProduct);
				res.json(result);
			} catch (error) {
				console.log({ data: `Internal Server Error: ${error}` });
				res.status(500).json({ error: 'Internal Server Error' });
			}
		});
	} catch (error) {
		console.log({ data: `Internal Server Error: ${err}` });
		res.status(500).json({ error: 'Internal Server Error' });
	}
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

//Controlador que activa o inactiva un producto
async function activateInactiveProduct(req, res) {
	try {
		const { idProduct, idState } = req.params;

		const result = await ProductModel.activateInactiveProduct(idProduct, idState);
		if (result.affectedRows === 0) {
			res.json({ data: 'Error' });
		} else {
			res.json({ data: result });
		}
	} catch (err) {
		console.log({ data: `Internal Server Error: ${err}` });
	};
};

module.exports = {
	getActivateInactiveProduct,
	getProduct,
	createProduct,
	updateProduct,
	activateInactiveProduct
};