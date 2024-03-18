const ProductModel = require('../../models/products/product.model');
const ids = require('../../config/ids');

//Controlador para obtener todos los productos según su estado
async function getActivateInactiveProduct(req, res) {
	try {
		const { idState } = req.params;
		const result = await ProductModel.getActivateInactiveProduct(idState);
		res.json({ data: result });
	} catch (err) {
		console.log({ data: `Internal Server Error: ${err}` });
	}
}

//Controlador para obtener la información de un producto según si id
async function getProduct(req, res) {
	try {
		const { idProduct } = req.params;
		const result = await ProductModel.getProduct(idProduct);
		if (result.length < 1) {
			res.json({ data: 'Error no found product' });
		} else {
			res.json({ data: result });
		}
	} catch (err) {
		console.log({ data: `Internal Server Error: ${err}` });
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
async function updateProduct(req, res) {
	const { idProduct } = req.params;
	const productData = req.body;
	const image = req.file ? req.file.path : null;

	try {
		const result = await ProductModel.updateProduct(idProduct, productData, image);
		if (result.affectedRows === 0) {
			res.json({ data: `Error: Product with ID ${idProduct} not found` });
		} else {
			res.json({ data: `Product with ID ${idProduct} has been updated successfully` });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error', details: error.message });
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