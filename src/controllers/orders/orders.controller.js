const OrderModel = require('../../models/orders/order.model');
const ids = require('../../config/ids');

//Insertar una orden
async function createOrder(req, res) {
  try {
    const { idCardWorker, total } = req.body;
    const table = 'orders';
    const condicion = 'idOrder';
  
    ids(table, condicion, async (idOrder, err) => {
      if (err) {
        console.log({ data: `error id: ${err}` });
        return res.status(500).json({ error: 'Internal Server Error' });
      };
      const infoOrder = {
        idOrder: idOrder,
        idCardWorker: idCardWorker,
        total: total,
        idState: "1"
      };
  
      try {
        const result = await OrderModel.createOrder(infoOrder);
        res.json(result)
      } catch (error) {
        console.log({ data: `Internal Server Error1: ${error}` });
      }
    });
  } catch (error) {
    console.log({ data: `Internal Server Error2: ${error}` });
		res.status(500).json({ error: 'Internal Server Error3' });
  }
};

module.exports = {
  createOrder,
}