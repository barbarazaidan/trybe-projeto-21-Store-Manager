const { productService } = require('../services');

const findAllProducts = async (_req, res) => {
    const { status, data } = await productService.findAll();
    return res.status(status).json(data);
};

module.exports = {
    findAllProducts,
};