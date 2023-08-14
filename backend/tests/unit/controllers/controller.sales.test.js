const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { salesService } = require('../../../src/services');
const { saleController } = require('../../../src/controllers');
const { 
    mockSaleServiceFindAll, 
    mockSaleServiceFindById, 
    mockSaleServiceFindByIdErro,
    mockSaleServiceDeleteItem,
    mockSaleServiceDeleteItemErro,
    mockSaleServiceAddItem,
    mockSaleServiceAddItemErro,
    mockSalesServiceEditQuantity,
    mockSalesServiceEditQuantityErroProduto,
    mockSalesServiceEditQuantityErroSale,
} = require('../../mocks/sale.mock');

const { expect, use } = chai;

use(sinonChai);

describe('Testando as funções da camada Controller.sales', function () {
    it('Testa a função findAllSales', async function () {
        sinon.stub(salesService, 'findAll').resolves(mockSaleServiceFindAll);
        
        const req = { body: {} };

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const dataReturn = [
            { saleId: 1, date: '2023-07-19T19:02:28.000Z', productId: 1, quantity: 5 },
            { saleId: 1, date: '2023-07-19T19:02:28.000Z', productId: 2, quantity: 10 },
            { saleId: 2, date: '2023-07-19T19:02:28.000Z', productId: 3, quantity: 15 },
        ];

        await saleController.findAllSales(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(dataReturn);
    });

    it('Testa a função findSaleById, passando o id = 1', async function () {
        sinon.stub(salesService, 'findById').resolves(mockSaleServiceFindById);
        
        const req = { params: { id: 1 }, body: {} };

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const dataReturn = [
            { date: '2023-07-29T16:30:38.000Z', productId: 1, quantity: 5 },
            { date: '2023-07-29T16:30:38.000Z', productId: 2, quantity: 10 },
        ];

        await saleController.findSaleById(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(dataReturn);
    });

    it('Testa se a função findSaleById retorna um erro ao ser passado um id inexistente', async function () {
        sinon.stub(salesService, 'findById').resolves(mockSaleServiceFindByIdErro);
        
        const req = { params: { id: 99 }, body: {} };

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const dataReturn = { message: 'Sale not found' };

        await saleController.findSaleById(req, res);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith(dataReturn);
    });

    it('Testa a função deleteSale', async function () {
        sinon.stub(salesService, 'deleteItem').resolves(mockSaleServiceDeleteItem);
        
        const req = { params: { id: 1 }, body: {} };

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await saleController.deleteSale(req, res);

        expect(res.status).to.have.been.calledWith(204);
    });

    it('Testa se a função deleteSale retorna um erro caso passado um id inexistente', async function () {
        sinon.stub(salesService, 'deleteItem').resolves(mockSaleServiceDeleteItemErro);
        
        const req = { params: { id: 99 }, body: {} };

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await saleController.deleteSale(req, res);
        
        const dataReturn = { message: 'Sale not found' };
        
        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith(dataReturn);
    });

    it('Testa a função addNewSale', async function () {
        sinon.stub(salesService, 'addItem').resolves(mockSaleServiceAddItem);
        
        const req = {
            body: [{ productId: 1, quantity: 100 }, { productId: 2, quantity: 55 }],
        };

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const dataReturn = {
            id: 3,
            itemsSold: [{ productId: 1, quantity: 100 }, { productId: 2, quantity: 55 }],
          };

        await saleController.addNewSale(req, res);

        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.have.been.calledWith(dataReturn);
    });

    it('Testa se a função addNewSale retorna um erro quando o id do produto é inexistente', async function () {
        sinon.stub(salesService, 'addItem').resolves(mockSaleServiceAddItemErro);
        
        const req = {
            body: [{ productId: 99, quantity: 100 }, { productId: 2, quantity: 55 }],
        };

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const dataReturn = { message: 'Product not found' };

        await saleController.addNewSale(req, res);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith(dataReturn);
    });

    it('Testa a função editProductQuantity', async function () {
        sinon.stub(salesService, 'editQuantity').resolves(mockSalesServiceEditQuantity);
       
        const req = {
            body: { quantity: 250 },
            params: { saleId: 1, productId: 2 },
        };

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const dataReturn = { date: '2023-08-03T17:44:03.315Z', productId: 2, quantity: 250, saleId: 1 };

        await saleController.editProductQuantity(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(dataReturn);
    });

    it('Testa se a função editProductQuantity retorna um erro quando o id do produto é inexistente', async function () {
      sinon.stub(salesService, 'editQuantity').resolves(mockSalesServiceEditQuantityErroProduto);
     
      const req = {
          body: { quantity: 250 },
          params: { saleId: 1, productId: 99 },
      };

      const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub(),
      };

      const dataReturn = { message: 'Product not found in sale' };

      await saleController.editProductQuantity(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith(dataReturn);
  });

  it('Testa se a função editProductQuantity retorna um erro quando o id da venda é inexistente', async function () {
    sinon.stub(salesService, 'editQuantity').resolves(mockSalesServiceEditQuantityErroSale);
   
    const req = {
        body: { quantity: 250 },
        params: { saleId: 99, productId: 2 },
    };

    const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
    };

    const dataReturn = { message: 'Sale not found' };

    await saleController.editProductQuantity(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(dataReturn);
});
    afterEach(sinon.restore);
});