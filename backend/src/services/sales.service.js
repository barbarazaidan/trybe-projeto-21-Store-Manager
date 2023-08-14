const { salesModel, productModel } = require('../models');

const validaInexistenteProductId = async (infoSales) => {
    const todosProdutos = await salesModel.findAll(); // retorna um array de objetos

    const isInexistenteProductId = infoSales.some(({ productId }) => {
        const isTodosIdDiferente = todosProdutos.every((objeto) => objeto.productId !== productId);
        return isTodosIdDiferente;
    });

    return isInexistenteProductId;
};

const validaSalesID = async (idDaVenda) => {
    const allSales = await salesModel.findAll();

    const isSaleId = allSales.some(({ saleId }) => saleId === +idDaVenda);
    return isSaleId;
};

const validaIdProductNasVendas = async (productId) => {
    const todosProdutos = await productModel.findAll(); // retorna um array de objetos

    const isIdExiste = todosProdutos.some((elemento) => elemento.id === +productId);

    return isIdExiste;
};

const validaSalesIdEditandoQuantidade = async (saleId) => {
    const allSales = await salesModel.findAll();

    const isSaleId = allSales.some((sale) => sale.saleId === +saleId);

    return isSaleId;
};

const findAll = async () => {
    const sales = await salesModel.findAll();
    return { status: 200, data: sales };
};

const findById = async (id) => {
    const sale = await salesModel.findById(id);
    if (sale.length === 0) {
        return { status: 404, data: { message: 'Sale not found' } };
    } return { status: 200, data: sale };
};

const addItem = async (infoSales) => {
    const isInexistenteProductId = await validaInexistenteProductId(infoSales);

    if (isInexistenteProductId) {
        return { status: 404, data: { message: 'Product not found' } };
    }

    const saleID = await salesModel.addItem(infoSales);
    
    const newSale = {
        id: saleID,
        itemsSold: infoSales,
    };
    
    return { status: 201, data: newSale };
};

const deleteItem = async (idDaVenda) => {
    const isSaleId = await validaSalesID(idDaVenda);
    if (!isSaleId) {
        return { status: 404, data: { message: 'Sale not found' } };
    }

    await salesModel.deleteItem(idDaVenda);
    return { status: 204 };
};

const editQuantity = async (saleId, productId, quantity) => {
    const isIdExiste = await validaIdProductNasVendas(productId);
    if (!isIdExiste) {
        return { status: 404, data: { message: 'Product not found in sale' } };
    }

    const isSaleId = await validaSalesIdEditandoQuantidade(saleId);

    if (!isSaleId) {
        return { status: 404, data: { message: 'Sale not found' } };
    }

    await salesModel.editQuantity(saleId, productId, quantity);
    
    const vendaComQuantidadeAlterada = {
        date: new Date(),
        productId: +productId, 
        quantity,
        saleId: +saleId,
    };

    return { status: 200, data: vendaComQuantidadeAlterada };
};

module.exports = {
    findAll,
    findById,
    addItem,
    deleteItem,
    editQuantity,
};