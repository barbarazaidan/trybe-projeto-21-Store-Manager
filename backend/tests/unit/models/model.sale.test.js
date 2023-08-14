const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { 
  mockFuncaoFindAllModel, 
  mockFuncaoFindByIdModel, 
  mockFuncaoAddItemModel,
  mockFuncaoDeleteItemModelSalesProducts,
  mockFuncaoDeleteItemModelSales,
  mockFuncaoEditQuantity,
} = require('../../mocks/sale.mock');

const { expect, use } = chai;

use(chaiHttp);

describe('Testando as funções da camada Model.sales', function () {
    it('Testa se a função findAll retorna uma lista com todas as vendas', async function () {
        sinon.stub(connection, 'execute').resolves([mockFuncaoFindAllModel]);

        const sales = await salesModel.findAll();
        // console.log('sales', sales);

        const salesList = [
          {
            saleId: 1,
            date: '2023-07-19T19:02:28.000Z',
            productId: 1,
            quantity: 5,
          },
          {
            saleId: 1,
            date: '2023-07-19T19:02:28.000Z',
            productId: 2,
            quantity: 10,
          },
          {
            saleId: 2,
            date: '2023-07-19T19:02:28.000Z',
            productId: 3,
            quantity: 15,
          },
        ];

        expect(sales).to.deep.equal(salesList);
    });

    it('Testa a função findById da venda com id 1', async function () {
        sinon.stub(connection, 'execute').resolves([mockFuncaoFindByIdModel]);

        const saleID = await salesModel.findById(1);

        const retorno = [{
          date: '2023-07-29T16:30:38.000Z',
          productId: 1,
          quantity: 5,
        },
        {
          date: '2023-07-29T16:30:38.000Z',
          productId: 2,
          quantity: 10,
        }];

        expect(saleID).to.deep.equal(retorno);
    });

    it('Testa a função addItem da venda', async function () {
      sinon.stub(connection, 'execute')
        .onFirstCall()
        .resolves(mockFuncaoAddItemModel)
        .onSecondCall()
        .resolves(undefined);
        // o teste passou mesmo se eu fizesse apenas um stub, colocando o mockFuncaoAddItemModel

      const inputInfoBody = [{ productId: 1, quantity: 100 }, { productId: 2, quantity: 500 }];

      const idNewSale = await salesModel.addItem(inputInfoBody);

      // console.log(idNewSale);

      expect(idNewSale).to.deep.equal(3);
  });

    it('Testa a função deleteItem da venda com id 1', async function () {
      sinon.stub(connection, 'execute')
        .onFirstCall()
        .resolves(mockFuncaoDeleteItemModelSalesProducts)
        .onSecondCall()
        .resolves(mockFuncaoDeleteItemModelSales);

      const inputIdVenda = 1;
      const retorno = await salesModel.deleteItem(inputIdVenda);

      expect(retorno).to.be.a('array');
      expect(retorno[0]).to.be.a('object');
});

    it('Testa a função editQuantity da venda', async function () {
      sinon.stub(connection, 'execute').resolves(mockFuncaoEditQuantity);

      const inputIdVenda = 1;
      const inputIdProduto = 2;
      const inputquantidade = 34;
      const retorno = await salesModel.editQuantity(inputIdVenda, inputIdProduto, inputquantidade);

      expect(retorno).to.be.a('array');
      expect(retorno[0]).to.be.a('object');
});
    
    afterEach(sinon.restore);
});