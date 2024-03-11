const db = require("../../dataBase/db");

class FormProductsModel{
  //Modelo para mostrar todas las categorias de los productos
  async getAllCategory() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM category';
      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  async getFilterCategory(idCategory) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM products WHERE idCategory = ?';
      db.query(sql, idCategory, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
}

module.exports = new FormProductsModel();