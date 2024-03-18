const ListworkModel = require("../../models/client/client.model");

//Controlador para crear un lista de trabajo
async function createListwork(req, res) {
  try {
    const { idWorkList, listName, creationDate, idCardWorker, idState } = req.body;

    const listworkInfo = {
        idWorkList: idWorkList,
        listName: listName,
        creationDate: creationDate,
        idCardWorker: idCardWorker,
        idState: idState
    };

    const result = await ListworkModel.createListwork(listworkInfo);
    res.json({ data: result });
  } catch (error) {
    console.error(error)
  };
};

async function getListwork(req, res) {
  try {
    const { idWorkList } = req.params;
    const listworkInfo = await ListworkModel.getListwork(idWorkList);
    if (infoClient.length < 1) {
      res.json()
    } else {
      res.json({ data: listworkInfo });
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' });
  };
};

module.exports = {
    createListwork,
    getListwork
}