const db = require('../../dataBase/db');

class ListworkModel {

  //Modelo para crear una lista de trabajo
  async createListwork(listworkInfo) {
    console.log(listworkInfo)
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO workerlist (idWorkList, listName, creationDate, idCardWorker, idState ) VALUES (?,?,?,?,?)';
      db.query(sql, Object.values(listworkInfo), (err, result) => {
        if(err){
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };


  async getListwork(idOrderDetail) {
    return new Promise((resolve, reject) =>{
      const sql = 'SELECT idOrderDetail, quantity, subTotal, idProduct, idOrder FROM orderdetail ';
      db.query(sql,idOrderDetail, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
}

//Modelo para obtener la información de un cliente
module.exports = new ListworkModel();