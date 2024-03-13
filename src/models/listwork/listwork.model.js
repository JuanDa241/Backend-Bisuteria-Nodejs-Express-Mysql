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
}

module.exports = new ListworkModel();