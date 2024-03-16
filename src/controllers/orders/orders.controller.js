const OrderModel = require('../../models/orders/order.model');
const ids = require('../../config/ids');

//Controlador para crear una orden
async function createOrder(req, res) {
  try {
    const { idCardWorker, total, quantityProducts, idCardClient } = req.body;
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
        quantityProducts: quantityProducts,
        idState: "1",
        idCardClient: idCardClient
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

//Controlador para obtener todos los pedidos según su estado
async function getOrderState(req,res) {
  try {
    const { idState } = req.params;
    const result = await OrderModel.getOrderState(idState);
    res.json({ data: result });
  } catch (error) {
    console.log({ data: `Internal Server Error Order: ${err}` });
  }
};

async function getOrderStateIdCard(req,res) {
  try {
    const { idState, idCardWorker } = req.params;
    const result = await OrderModel.getOrderStateIdCard(idState, idCardWorker);
    res.json({ data: result });
  } catch (error) {
    console.log({ data: `Internal Server Error Order: ${err}` });
  }
};

module.exports = {
  createOrder,
  getOrderState,
  getOrderStateIdCard,
}