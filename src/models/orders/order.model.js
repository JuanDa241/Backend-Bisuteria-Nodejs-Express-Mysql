const db = require("../../dataBase/db");

class OrderModel {
  //Modelo para crear una orden nueva a la base de datos
  async createOrder(infoOrder) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO orders(idOrder, idCardWorker, total, idState) VALUES (?,?,?,?)';
      db.query(sql, Object.values(infoOrder), (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
}

module.exports = new OrderModel();