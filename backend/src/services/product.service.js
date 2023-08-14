const { productModel } = require('../models');

const findAll = async () => {
    const produtos = await productModel.findAll();
    return { status: 200, data: produtos };
};

module.exports = {
    findAll,
};