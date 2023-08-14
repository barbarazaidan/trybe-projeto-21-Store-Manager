const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { 
    mockProductServiceFindAll, 
    mockProductServiceAddItem, 
    mockProductServiceAddItemSemName, 
    mockProductServiceAddItemNamePequeno,
    mockProductServiceDeleteItem,
    mockProductServiceDeleteItemErro,
    mockProductServiceFindById,
    mockProductServiceFindByIdErro,
    mockProductServiceEditItem,
    mockProductServiceEditItemErro,
} = require('../../mocks/product.mock');
const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');

const { expect, use } = chai;

use(sinonChai);

describe('Testando as funções da camada Controller.product', function () {
    it('Testa a função findAllProducts', async function () {
        sinon.stub(productService, 'findAll').resolves(mockProductServiceFindAll);
        
        const req = {
            body: {},
        };

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const dataReturn = [
            { id: 1, name: 'Martelo de Thor' },
            { id: 2, name: 'Traje de encolhimento' },
            { id: 3, name: 'Escudo do CapitÃ£o AmÃ©rica' },
          ];

        await productController.findAllProducts(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(dataReturn);
    });

    it('Testa a função findProductById, passando o id = 2', async function () {
        sinon.stub(productService, 'findById').resolves(mockProductServiceFindById);
        
        const req = { params: { id: 2 }, body: {} };

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const dataReturn = { id: 2, name: 'Traje de encolhimento' };

        await productController.findProductById(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(dataReturn);
    });

    it('Testa se a função findProductById retorna um erro ao ser passado um id inexistente', async function () {
        sinon.stub(productService, 'findById').resolves(mockProductServiceFindByIdErro);
        
        const req = { params: { id: 99 }, body: {} };

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const dataReturn = { message: 'Product not found' };

        await productController.findProductById(req, res);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith(dataReturn);
    });

    it('Testa a função addNewProduct', async function () {
        sinon.stub(productService, 'addItem').resolves(mockProductServiceAddItem);
        
        const req = {
            body: { name: 'Capa de invisibilidade' },
        };

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const dataReturn = { id: 4, name: 'Capa de invisibilidade' };

        await productController.addNewProduct(req, res);

        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.have.been.calledWith(dataReturn);
    });

    it('Testa se a função addNewProduct retorna um erro quando o parâmetro "name" não é passado', async function () {
        sinon.stub(productService, 'addItem').resolves(mockProductServiceAddItemSemName);
        
        const req = {
            body: { produto: 'Capa de invisibilidade' },
        };

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const dataReturn = { message: '"name" is required' };

        await productController.addNewProduct(req, res);

        expect(res.status).to.have.been.calledWith(400);
        expect(res.json).to.have.been.calledWith(dataReturn);
    });

    it('Testa se a função addNewProduct retorna um erro quando o parâmetro "name" é muito pequeno', async function () {
        sinon.stub(productService, 'addItem').resolves(mockProductServiceAddItemNamePequeno);
        
        const req = {
            body: { produto: 'Capa' },
        };

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const dataReturn = { message: '"name" length must be at least 5 characters long' };

        await productController.addNewProduct(req, res);

        expect(res.status).to.have.been.calledWith(422);
        expect(res.json).to.have.been.calledWith(dataReturn);
    });

    it('Testa a função editProduct passando o id = 2', async function () {
        sinon.stub(productService, 'editItem').resolves(mockProductServiceEditItem);
       
        const req = {
            body: { name: 'Capa de invisibilidade Harry Potter' },
            params: { id: 2 },
        };

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const dataReturn = { id: 2, name: 'Capa de invisibilidade Harry Potter' };

        await productController.editProduct(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(dataReturn);
    });

    it('Testa se função editProduct retorna um erro quando o id passado é inexistente', async function () {
        sinon.stub(productService, 'editItem').resolves(mockProductServiceEditItemErro);
       
        const req = {
            body: { name: 'Capa de invisibilidade Harry Potter' },
            params: { id: 99 },
        };

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const dataReturn = { message: 'Product not found' };

        await productController.editProduct(req, res);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith(dataReturn);
    });

    it('Testa a função deleteProduct', async function () {
        sinon.stub(productService, 'deleteItem').resolves(mockProductServiceDeleteItem);
        
        const req = {
            params: { id: 2 },
            body: {},
        };

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await productController.deleteProduct(req, res);

        expect(res.status).to.have.been.calledWith(204);
    });

    it('Testa se a função deleteProduct retorna um erro caso passado um id inexistente', async function () {
        sinon.stub(productService, 'deleteItem').resolves(mockProductServiceDeleteItemErro);
        
        const req = {
            params: { id: 99 },
            body: {},
        };

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await productController.deleteProduct(req, res);
        
        const dataReturn = { message: 'Product not found' };
        
        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith(dataReturn);
    });

    afterEach(sinon.restore);
});