const FormWorkerModel = require("../../models/worker/formWorker.model");

//Controlador para mostrar el rol de artesano y vendedor
async function getSellerCrastman(req, res) {
  try {
    const result = await FormWorkerModel.getSellerCrastman();
    res.json({ data: result });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  };
};

//Controlador para mostrar todos los bancos
async function getBank(req, res) {
  try {
    const result = await FormWorkerModel.getBank();
    res.json({ data: result });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  };
};

//Controlador para mostrar todos los trabajadores con rol de artesano activos
async function getCrastman(req, res) {
  try {
    const result = await FormWorkerModel.getCrastman();
    res.json({ data: result })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  };
};

module.exports = {
  getSellerCrastman,
  getBank,
  getCrastman
}