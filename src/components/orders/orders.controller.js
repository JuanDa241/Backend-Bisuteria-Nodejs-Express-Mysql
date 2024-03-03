const db = require('../../dataBase/db')
const ids = require('../../config/ids')


//Insertar una orden
function createOrder(req, res) {
  const { idCardClient, idCardWorker ,  idState } = req.body;


  const table = 'orders';
  const condicion = 'idOrder';

  ids(table, condicion, (idOrder, err) => {
    if (err) {
      console.log({ data: `error id: ${err}` });
    };
    const order = {
      idOrder: idOrder,
      idCardClient: idCardClient,
      idCardWorker: idCardWorker,
      idState: idState
    };

    try {
      const sql = 'INSERT INTO orders(idOrder, idCardClient, idCardWorker, idState) VALUES (?,?,?,?)';
      db.query(sql, [order.idOrder, order.idCardClient, order.idCardWorker, order.idState], (err, result) => {
        if (err) {
          throw err;
        } else {
          res.json({ data: result });
        }
      });
    } catch (error) {
      console.log({ data: `Internal Server Error: ${err}` });
    }
  });
}

module.exports = {
  createOrder,
}