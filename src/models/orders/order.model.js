const db = require("../../dataBase/db");

class OrderModel {
  //Modelo para crear una orden nueva y la ordencliente en la base de datos
  async createOrder(infoOrder) {
    return new Promise((resolve, reject) => {
      const { idOrder, idCardWorker, total, idState, idCardClient } = infoOrder;
      const sql = 'INSERT INTO orders(idOrder, idCardWorker, total, idState) VALUES (?,?,?,?)';
      db.query(sql, [idOrder, idCardWorker, total, idState], (err, result) => {
        if (err) {
          reject(err);
        } else {
          // Obtener el ID de la última orden insertada
          const getIdQuery = 'SELECT idOrder FROM orders WHERE idCardWorker = ? AND total = ? AND idState = ? ORDER BY orderDate DESC LIMIT 1';
          db.query(getIdQuery, [idCardWorker, total, idState], (err, rows) => {
            if (err) {
              reject(err);
            } else {
              if (rows.length === 0) {
                reject(new Error('No se encontró ninguna orden que coincida con los criterios especificados.'));
                return;
              }

              const orderId = rows[0].idOrder;
              console.log('ID de la última orden insertada:', orderId);

              // Insertar en la tabla orderClient con el ID de la última orden
              const detalleSql = 'INSERT INTO orderClient(idOrder, idCardClient) VALUES (?,?)';
              const detalleValues = [orderId, idCardClient];
              db.query(detalleSql, detalleValues, (err, detalleResult) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(detalleResult);
                }
              });
            }
          });
        }
      });
    });
  };

  //Modelo para obtener los pedidos según su estado
  async getOrderState(idState) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM orders WHERE idState = ?';
      db.query(sql, idState, (err, result) => {
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