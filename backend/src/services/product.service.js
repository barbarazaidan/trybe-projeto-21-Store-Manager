const { productModel } = require('../models');

const validaId = async (id) => {
    const todosProdutos = await productModel.findAll(); // retorna um array de objetos

    // console.log('todosProdutos', todosProdutos)
    const isIdExiste = todosProdutos.some((elemento) => elemento.id === +id);
    return isIdExiste;
};

const findAll = async () => {
    const produtos = await productModel.findAll();
    return { status: 200, data: produtos };
};

const findById = async (id) => {
    const produto = await productModel.findById(id);
    if (produto === undefined) {
        return { status: 404, data: { message: 'Product not found' } };
    } return { status: 200, data: produto };
};

const addItem = async (name) => {
    if (name === undefined) {
        return { status: 400, data: { message: '"name" is required' } };
    }

    if (name.length <= 4) {
        return { 
            status: 422, data: { message: '"name" length must be at least 5 characters long' }, 
        };
    }

    const productID = await productModel.addItem(name);

    const newProduct = {
        id: productID,
        name,
    };
    return { status: 201, data: newProduct };
};

const editItem = async (id, name) => {
    const isIdExiste = await validaId(id);
    if (!isIdExiste) {
        return { status: 404, data: { message: 'Product not found' } };
    }
    
    await productModel.editItem(id, name);
    
    const produtoEditado = {
        id: +id,
        name,
    };
    return { status: 200, data: produtoEditado };
};

const deleteItem = async (id) => {
    const isIdExiste = await validaId(id);
    if (!isIdExiste) {
        return { status: 404, data: { message: 'Product not found' } };
    }
    await productModel.deleteItem(id);
    return { status: 204 };
};

module.exports = {
    findAll,
    findById,
    addItem,
    editItem,
    deleteItem,
};