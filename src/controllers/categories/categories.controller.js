const categoriesModel = require("../../models/client/client.model");

async function getCategories(req, res) {
  try {
    const { idCategory } = req.params;
    const categoriesInfo = await categoriesModel.getCategories(idCategory);
    if (infoCategories.length < 1) {
      res.json()
    } else {
      res.json({ data: categoriesInfo });
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' });
  };
};

module.exports = {
    getCategories
}