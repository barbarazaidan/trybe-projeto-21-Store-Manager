const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
const { mockProductEditItem, mockProductDeleteItem } = require('../../mocks/product.mock');

const { expect, use } = chai;

use(chaiHttp);

const productList = [
    {
      id: 1,
      name: 'Martelo de Thor',
    },
    {
      id: 2,
      name: 'Traje de encolhimento',
    },
    {
      id: 3,
      name: 'Escudo do CapitÃ£o AmÃ©rica',
    },
  ];

describe('Testando as funções da camada Service.products', function () {
  it('Testa se a função retorna um objeto com chaves "status" e "data"', async function () {
    sinon.stub(connection, 'execute').resolves([productList]);

    const products = await productService.findAll();
    // console.log('products', products);

    expect(products).to.have.all.keys('status', 'data');
  });

  it('Testa a listagem do produto com id 2', async function () {
    sinon.stub(connection, 'execute').resolves([[productList[1]]]);

    const productID = await productService.findById(2);
    // console.log(productID, 'productID');

    expect(productID.status).to.be.equal(200);
    expect(productID.data).to.be.deep.equal({ id: 2, name: 'Traje de encolhimento' });
  });

  it('Testa a mensagem de erro para um produto com id não encontrado', async function () {
    sinon.stub(connection, 'execute').resolves([[productList[98]]]);

    const productID = await productService.findById(99);
    // console.log(productID, 'productID');

    expect(productID.status).to.be.equal(404);
     expect(productID.data).to.have.property('message', 'Product not found');
  });

  it('Testa se um produto é adicionado usando POST na rota /products', async function () {
    sinon.stub(productModel, 'addItem').resolves(4);

    const inputNameProduct = 'Capa de invisibilidade';
    const resposta = await productService.addItem(inputNameProduct);
    const novoProduto = { id: 4, name: 'Capa de invisibilidade' };

    expect(resposta.status).to.be.equal(201);
    expect(resposta.data).to.be.deep.equal(novoProduto);
  });

  it('Testa se aparece um erro ao tentar adicionar um produto com name menor que o tamanho permitido usando POST na rota /products', async function () {
    const inputNameProduct = 'Capa';
    const resposta = await productService.addItem(inputNameProduct);

    expect(resposta.status).to.be.equal(422);
    expect(resposta.data).to.be.deep.equal({ message: '"name" length must be at least 5 characters long' });
  });

  it('Testa se aparece um erro ao tentar adicionar um produto sem nome usando POST na rota /products', async function () {
    const resposta = await productService.addItem();

    expect(resposta.status).to.be.equal(400);
    expect(resposta.data).to.be.deep.equal({ message: '"name" is required' });
  });

  it('Testa se um produto é editado corretamente usando PUT na rota /products/1', async function () {
    sinon.stub(productModel, 'findAll').resolves(productList);
    sinon.stub(productModel, 'editItem').resolves(mockProductEditItem);

    const inputIdProduct = '1';
    const inputNameProduct = 'traje do super-homem';
    const resposta = await productService.editItem(inputIdProduct, inputNameProduct);
    const produtoEditado = { id: 1, name: 'traje do super-homem' };

    // console.log(resposta, 'resposta2')

    expect(resposta.status).to.be.equal(200);
    expect(resposta.data).to.be.deep.equal(produtoEditado);
  });

  it('Testa se aparece um erro ao tentar editar um produto inexistente usando PUT na rota /products/99', async function () {
    sinon.stub(productModel, 'findAll').resolves(productList);
    sinon.stub(productModel, 'editItem').resolves(mockProductEditItem);

    const inputIdProduct = '99';
    const inputNameProduct = 'traje do homem de ferro';
    const resposta = await productService.editItem(inputIdProduct, inputNameProduct);

    expect(resposta.status).to.be.equal(404);
    expect(resposta.data).to.be.deep.equal({ message: 'Product not found' });
  });

  it('Testa se um produto é deletado corretamente usando DELETE na rota /products/2', async function () {
    sinon.stub(productModel, 'findAll').resolves(productList);
    sinon.stub(productModel, 'deleteItem').resolves(mockProductDeleteItem);

    const inputIdProduct = '2';
    const resposta = await productService.deleteItem(inputIdProduct);

    // console.log(resposta, 'resposta');

    expect(resposta.status).to.be.equal(204);
  });

  it('Testa se ocorre um erro ao tentar deletar um produto inexistente usando DELETE na rota /products/99', async function () {
    sinon.stub(productModel, 'findAll').resolves(productList);

    const inputIdProduct = '99';
    const resposta = await productService.deleteItem(inputIdProduct);

    // console.log(resposta, 'resposta');

    expect(resposta.status).to.be.equal(404);
    expect(resposta.data).to.be.deep.equal({ message: 'Product not found' });
  });

  afterEach(sinon.restore);
});