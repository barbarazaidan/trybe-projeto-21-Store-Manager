const { productService } = require('../services');

const findAllProducts = async (_req, res) => {
    const { status, data } = await productService.findAll();
    return res.status(status).json(data);
};

const findProductById = async (req, res) => {
    const { id } = req.params;
    const { status, data } = await productService.findById(id);
    res.status(status).json(data);
};

const addNewProduct = async (req, res) => {
    const { name } = req.body;
    const { status, data } = await productService.addItem(name);
    return res.status(status).json(data);
};

const editProduct = async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    const { status, data } = await productService.editItem(id, name);
    return res.status(status).json(data);
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const { status, data } = await productService.deleteItem(id);
    if (data) {
        return res.status(status).json(data);
    } return res.status(status).json();
};

module.exports = {
    findAllProducts,
    findProductById,
    addNewProduct,
    editProduct,
    deleteProduct,
};