const { salesService } = require('../services');

const findAllSales = async (_req, res) => {
    const { status, data } = await salesService.findAll();
    return res.status(status).json(data);
};

const findSaleById = async (req, res) => {
    const { id } = req.params;
    const { status, data } = await salesService.findById(id);
    res.status(status).json(data);
};

const addNewSale = async (req, res) => {
    const { status, data } = await salesService.addItem(req.body);
    return res.status(status).json(data);
};

const deleteSale = async (req, res) => {
    const { id } = req.params;
    const { status, data } = await salesService.deleteItem(id);
    if (data) {
        return res.status(status).json(data);
    }
    return res.status(status).json();
};

const editProductQuantity = async (req, res) => {
    const { quantity } = req.body;
    const { saleId, productId } = req.params;
    const { status, data } = await salesService.editQuantity(saleId, productId, quantity);
    return res.status(status).json(data);
};

module.exports = {
    findAllSales,
    findSaleById,
    addNewSale,
    deleteSale,
    editProductQuantity,
};