const ClientModel = require("../../models/client/client.model");

//Controlador para crear un cliente
async function createClient(req, res) {
  try {
    const { idCardClient, clientname, clientAddress, clientPhone } = req.body;

    const clientInfo = {
      idCardClient: idCardClient,
      clientname: clientname,
      clientAddress: clientAddress,
      clientPhone: clientPhone
    };

    const result = await ClientModel.createClient(clientInfo);
    res.json({ data: result });
  } catch (error) {
    console.error(error)
  };
};

//Controlador para obtener la información de un cliente
async function getClient(req, res) {
  try {
    const { idCardClient } = req.params;
    const infoClient = await ClientModel.getClient(idCardClient);
    if (infoClient.length < 1) {
      res.json()
    } else {
      res.json({ data: infoClient });
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error (getClient)' });
  };
};

//Controlador para obtener la informacón de un cliente según el idOrder
async function getClientIdOrder(req, res) {
  try {
    const { idOrder } = req.params;
    const infoClient = await ClientModel.getClientIdOrder(idOrder);
    if (infoClient.length < 1) {
      res.json()
    } else {
      res.json({ data: infoClient });
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error (getClientIdOrder)' });
  };
};

//Controlador para actualizar la información de un cliente
async function updateClient(req, res) {
  try {
    const { idCardClient } = req.params;
    const infoClient = req.body
    const result = await ClientModel.updateClient(idCardClient,infoClient);
    if (result.affectedRows === 0) {
			res.json({ data: `Error: worker with ID ${idCardClient} not found` });
		} else {
			res.json({ data: `Worker with ID ${idCardClient} has been updated successfully` });
		}
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


module.exports = {
  createClient,
  getClient,
  getClientIdOrder,
  updateClient
}