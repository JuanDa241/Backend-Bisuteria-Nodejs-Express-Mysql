const db = require("../../dataBase/db");

class categoriesModel {
  async getAnillos() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM category WHERE categorys = "Pulceras"';
      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  async getChockers() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM category WHERE categorys = "Chockers"';
      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  async getPulceras() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM category WHERE categorys = "Pulceras"';
      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  async getAretas() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM category WHERE category = "Aretas"';
      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = new categoriesModel();
