const db = require('../../dataBase/db');

//Clase que controlará todas las peticiones de los productos
class ProductModel {
  //Modelo para insertar un nuevo producto a la base de datos
  async createProduct(infoProduct) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO products(idProduct, nameProduct, price, laborPrice, image, idCategory, idState) VALUES (?,?,?,?,?,?,?)';
      db.query(sql, Object.values(infoProduct), (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  //Modelo para obtener todos los productos según su estado
  async getActivateInactiveProduct(idState){
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM products WHERE idState = ?';
      db.query(sql, idState, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  //Modelo para obtener la información de un producto
  async getProduct(idProduct){
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM products WHERE idProduct = ?';
      db.query(sql, idProduct, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  //Modelo para activar o desactivar un producto
  async activateInactiveProduct(idProduct, idState) {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE products SET idState = ? WHERE idProduct = ?';
      db.query(sql, [idState, idProduct], (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (result.affectedRows === 0) {
            reject({ message: `No se encontró ningún producto con ID: ${idProduct}` });
          } else {
            resolve({ message: `Se ha actualizado el estado del producto con ID: ${idProduct}` });
          }
        }
      });
    });
  };

  //Modelo para actualizar la información de un producto
  async updateProduct(idProduct, productData, image) {
    const { nameProduct, price, laborPrice, idCategory } = productData;

    const updateSql = 'UPDATE products SET nameProduct = ?, price = ?, laborPrice = ?, idCategory = ? WHERE idProduct = ?';
		const updateImageSql = 'UPDATE products SET nameProduct = ?, price = ?, laborPrice = ?, image = ?, idCategory = ? WHERE idProduct = ?';

		const sql = image ? updateImageSql : updateSql;
		const params = image ? [nameProduct, price, laborPrice, image, idCategory, idProduct] : [nameProduct, price, laborPrice, idCategory, idProduct];

    return new Promise((resolve, reject) => {
      db.query(sql, params, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };


}

module.exports = new ProductModel();