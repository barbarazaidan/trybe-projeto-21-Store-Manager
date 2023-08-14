const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { salesModel, productModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { 
    mockFuncaoFindAllModel,
    mockFuncaoFindByIdModel,
    mockFuncaoFindByIdModelIdInexistente,
    mockFuncaoDeleteItemModelSalesProducts,
    mockFuncaoDeleteItemModelSales,
    mockFuncaoEditQuantity,
 } = require('../../mocks/sale.mock');

 const { productList } = require('../../mocks/product.mock');

const { expect, use } = chai;

use(chaiHttp);

describe('Testando as funções da camada Service.sales', function () {
  it('Testa a função findAll na rota GET /sales', async function () {
    sinon.stub(salesModel, 'findAll').resolves(mockFuncaoFindAllModel);

    const resposta = await salesService.findAll();
    const data = [
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
    
    expect(resposta.status).to.be.equal(200);
    expect(resposta.data).to.be.deep.equal(data);
  });

  it('Testa a função findById na rota GET /sales/:id', async function () {
    sinon.stub(salesModel, 'findById').resolves(mockFuncaoFindByIdModel);
    
    const inputIdSale = 2;
    const resposta = await salesService.findById(inputIdSale);
    const data = [
        {
          date: '2023-07-29T16:30:38.000Z',
          productId: 1,
          quantity: 5,
        },
        {
          date: '2023-07-29T16:30:38.000Z',
          productId: 2,
          quantity: 10,
        },
      ];

    expect(resposta.status).to.be.equal(200);
    expect(resposta.data).to.be.deep.equal(data);
  });

  it('Testa se aparece um erro ao tentar acessar uma venda que não existe na rota GET /sales/:id', async function () {
    sinon.stub(salesModel, 'findById').resolves(mockFuncaoFindByIdModelIdInexistente);
    
    const inputIdSale = 99;
    const resposta = await salesService.findById(inputIdSale);

    expect(resposta.status).to.be.equal(404);
    expect(resposta.data).to.be.deep.equal({ message: 'Sale not found' });
  });

  it('Testa se é possível adicionar uma venda usando a função addItem na rota POST /sales', async function () {
    sinon.stub(salesModel, 'findAll').resolves(mockFuncaoFindAllModel);
    sinon.stub(salesModel, 'addItem').resolves(3);

    const inputDadosVenda = [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
    ];

    const resposta = await salesService.addItem(inputDadosVenda);
    
    const saleAdicionada = {
        id: 3,
        itemsSold: [
          {
            productId: 1,
            quantity: 1,
          },
          {
            productId: 2,
            quantity: 5,
          },
        ],
    };

    expect(resposta.status).to.be.equal(201);
    expect(resposta.data).to.be.deep.equal(saleAdicionada);
  });

  it('Testa se um erro aparece ao tentar adicionar uam venda usando o ID de um produto inexistente na rota POST /sales', async function () {
    sinon.stub(salesModel, 'findAll').resolves(mockFuncaoFindAllModel);

    const inputDadosVenda = [
        {
          productId: 99,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
    ];

    const resposta = await salesService.addItem(inputDadosVenda);

    expect(resposta.status).to.be.equal(404);
    expect(resposta.data).to.be.deep.equal({ message: 'Product not found' });
  });

  it('Testa se uma venda é deletada corretamente usando a rota DELETE /sales/:id', async function () {
    sinon.stub(salesModel, 'findAll').resolves(mockFuncaoFindAllModel);
    sinon.stub(salesModel, 'deleteItem')
        .onFirstCall()
        .resolves(mockFuncaoDeleteItemModelSalesProducts)
        .onSecondCall()
        .resolves(mockFuncaoDeleteItemModelSales);

    const inputSalesId = 1;
    const resposta = await salesService.deleteItem(inputSalesId);

    expect(resposta.status).to.be.equal(204);
  });

  it('Testa se ocorre um erro ao tentar deletar uma venda inexistente usando a rota DELETE /sales/:id', async function () {
    sinon.stub(salesModel, 'findAll').resolves(mockFuncaoFindAllModel);

    const inputIdSale = 99;
    const resposta = await salesService.deleteItem(inputIdSale);

    expect(resposta.status).to.be.equal(404);
    expect(resposta.data).to.be.deep.equal({ message: 'Sale not found' });
  });

  it('Testa a função editQuantity na rota PUT /sales/:saleId/products/:productId/quantity', async function () {
    sinon.stub(productModel, 'findAll').resolves(productList);
    sinon.stub(salesModel, 'findAll').resolves(mockFuncaoFindAllModel);
    sinon.stub(salesModel, 'editQuantity').resolves(mockFuncaoEditQuantity);
    sinon.useFakeTimers(new Date().getTime()); // usei para mockar o retorno da data, encontrei a função neste link https://stackoverflow.com/questions/31591098/how-do-i-stub-new-date-using-sinon

    const inputIdSale = 1;
    const inputIdProduct = 2;
    const inputquantity = 50;

    const resposta = await salesService.editQuantity(inputIdSale, inputIdProduct, inputquantity);

    const data = {
        date: new Date(),
        productId: 2, 
        quantity: 50,
        saleId: 1,
    };

    expect(resposta.status).to.be.equal(200);
    expect(resposta.data).to.be.deep.equal(data);
  });

  it('Testa se ocorre um erro ao tentar usar a função editQuantity com um produto inexistente na rota PUT /sales/:saleId/products/:productId/quantity', async function () {
    sinon.stub(productModel, 'findAll').resolves(productList);

    const inputIdSale = 1;
    const inputIdProduct = 99;
    const inputquantity = 50;

    const resposta = await salesService.editQuantity(inputIdSale, inputIdProduct, inputquantity);

    expect(resposta.status).to.be.equal(404);
    expect(resposta.data).to.be.deep.equal({ message: 'Product not found in sale' });
  });

  it('Testa se ocorre um erro ao tentar usar a função editQuantity com uma venda inexistente na rota PUT /sales/:saleId/products/:productId/quantity', async function () {
    sinon.stub(productModel, 'findAll').resolves(productList);
    sinon.stub(salesModel, 'findAll').resolves(mockFuncaoFindAllModel);

    const inputIdSale = 99;
    const inputIdProduct = 2;
    const inputquantity = 50;

    const resposta = await salesService.editQuantity(inputIdSale, inputIdProduct, inputquantity);

    expect(resposta.status).to.be.equal(404);
    expect(resposta.data).to.be.deep.equal({ message: 'Sale not found' });
  });

  afterEach(sinon.restore);
});