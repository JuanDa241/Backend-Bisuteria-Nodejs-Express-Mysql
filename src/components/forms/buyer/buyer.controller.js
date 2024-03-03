const db = require('../../../dataBase/db');

//Crear un cliente 
function createClient(req, res) {
  const { idCardClient, clientname, clientAddress, clientPhone } = req.body;

  const client = {
    idCardClient: idCardClient,
    clientname: clientname,
    clientAddress: clientAddress,
    clientPhone: clientPhone
  };

  try {
    const sql = 'INSERT INTO client (idCardClient, clientname, clientAddress, clientPhone ) VALUES (?,?,?,?)';
    db.query(sql, [client.idCardClient, client.clientname, client.clientAddress, client.clientPhone], (err, result) => {
      if (err) {
        throw err;
      } else {
        res.json({ data: result });
      }
    });
  } catch (error) {
    console.log({ data: ` Internal Server Error: ${error}` });
  };
};

//Obtener un client
function getClient(req, res) {
  const { idCardClient } = req.params;

  try {
    let sql = 'SELECT * FROM client WHERE idCardClient = ?';
    db.query(sql, idCardClient, (err, rows, field) => {
      if (!err) {
        if (rows.length < 1) {
          res.json({ data: `Error no found client` });
        } else {
          res.json({ data: rows });
        }
      } else {
        throw err;
      }
    });
  } catch (error) {
    console.log({ data: `Internal Server Error: ${error}` });
  }
};

//Actualizar un cliente
function updateClient(req, res) {
  const { idCardClient } = req.params;
  const { clientname, clientAddress, clientPhone } = req.body;

  try {
    const sql = 'UPDATE client SET clientname = ?, clientAddress = ?, clientPhone = ? WHERE idCardClient = ?';
    db.query(sql, [clientname, clientAddress, clientPhone, idCardClient], (err, result) => {
      if (err) {
        throw err;
      } else {
        if (result.affectedRows === 0){
          res.json({ data: `Error: client with Id ${idCardClient} no found` });
        } else {
          res.json({ data: `client with Id ${idCardClient} has been updated successfully` });
        }
      }
    });
  } catch (error) {
    console.log({ data: `Internal Server Error: ${error}` })
  }
}

module.exports = {
  createClient,
  getClient,
  updateClient,
};