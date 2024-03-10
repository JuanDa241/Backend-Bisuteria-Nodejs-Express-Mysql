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


}

module.exports = new ProductModel();