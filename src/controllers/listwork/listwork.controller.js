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

module.exports = {
    createListwork
}