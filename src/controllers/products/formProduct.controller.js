const FormProduct = require("../../models/products/formProduct");

//Controlador para mostrar todas las categorias de los productos
async function getAllCategory(req, res) {
  try {
    const result = await FormProduct.getAllCategory();
    res.json({ data: result })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  };
};

async function getFilterCategory(req, res) {
  try {
    const { idCategory } = req.params
    const result = await FormProduct.getFilterCategory(idCategory);
    res.json({ data: result });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  };
};

module.exports = {
  getAllCategory,
  getFilterCategory
}