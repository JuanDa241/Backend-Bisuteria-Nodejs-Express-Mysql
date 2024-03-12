const db = require('../../dataBase/db');

class ClientModel {
  //Modelo para crear un cliente
  async createClient(clientInfo) {
    console.log(clientInfo)
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO client (idCardClient, clientname, clientAddress, clientPhone ) VALUES (?,?,?,?)';
      db.query(sql, Object.values(clientInfo), (err, result) => {
        if(err){
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  //Modelo para obtener la información de un cliente
  async getClient(idCardClient) {
    return new Promise((resolve, reject) =>{
      const sql = 'SELECT * FROM client WHERE idCardClient = ?';
      db.query(sql,idCardClient, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  async updateClient(idCardClient, infoClient) {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE client SET clientname = ?, clientAddress = ?, clientPhone = ? WHERE idCardClient = ?';
      db.query(sql, [...Object.values(infoClient) , idCardClient], (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (result.affectedRows === 0) {
            reject({ message: `No se encontró ningún producto con ID: ${idCardClient}` });
          } else {
            resolve({ message: `Se ha actualizado el estado del producto con ID: ${idCardClient}` });
          }
        }
      });
    });
  };
}

module.exports = new ClientModel();