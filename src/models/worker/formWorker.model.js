const db = require('../../dataBase/db');

class FormWorkerModel {
  //Modelo para obtener los roles de artesano y vendedor 
  async getSellerCrastman() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM role WHERE roles IN ("Artesano","Vendedor")';
      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  //Modelo para obtener todos los bancos
  async getBank() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM bank';
      db.query(sql, (err, result) => {
        if (!err) {
          if (result.length < 1) {
            reject(err);
          } else {
            resolve(result);
          }
        } else {
          throw err
        }
      });
    });
  };

  //Modelo para obtener los trabajadores con rol de artesano que estan activos
  async getCrastman() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT idCardWorker, workerName, workerLastName, photo FROM worker WHERE idRole = 2 AND idState = 4'
      db.query(sql, (err, result) => {
        if (!err) {
          if (result.length < 1) {
            reject(err);
          } else {
            resolve(result);
          }
        } else {
          throw err
        }
      });
    });
  };
}

module.exports = new FormWorkerModel();