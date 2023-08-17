const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const app = require('../../src/app');
const connection = require('../../src/models/connection');
const {
  productList,
  mockProductFindByIdInexistente,
  mockProductEditItem,
  mockProductDeleteItem,
} = require('../mocks/product.mock');

const { expect, use } = chai;

use(chaiHttp);

const setInfoContent = 'content-type';
const setInfoApplication = 'application/json';

describe('Testando endpoints para listar produtos', function () {
  it('Testa se o produto correto é retornado na rota /products/1', async function () {
    /*
        meu productList é um array com objetos dentro, aí dentro desse stub, eu pego meu array e jogo dentro
        de outro array. Isso vai reproduzir o comportamento da minha função, que é descontruir o primeiro
        elemento do array
        */
    sinon.stub(connection, 'execute').resolves([productList]);
    const response = await chai.request(app).get('/products/1');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.a('object');
    expect(response.body).to.have.property('id');
    expect(response.body).to.have.property('name');
  });

  it('Testa a mensagem de erro para a rota encontrado/products/99', async function () {
    sinon.stub(connection, 'execute').resolves(mockProductFindByIdInexistente);
    const response = await chai.request(app).get('/products/99');

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: 'Product not found' });
  });

  it('Testa a mensagem de erro no POST na rota /products/, caso o parâmetro "name" não seja passado', async function () {
    // aqui não fiz stub porque o caminho não chega a cair no banco, parando no middleware de validação
    const response = await chai
      .request(app)
      .post('/products/')
      .set(setInfoContent, setInfoApplication)
      .send({ produto: 'Capa de invisibilidade' });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: '"name" is required' });
  });

  it('Testa a mensagem de erro no POST na rota /products/, caso o parâmetro "name" seja muito pequeno', async function () {
    // aqui não fiz stub porque o caminho não chega a cair no banco, parando no middleware de validação
    const response = await chai
      .request(app)
      .post('/products/')
      .set(setInfoContent, setInfoApplication)
      .send({ name: 'Capa' });

    expect(response.status).to.be.equal(422);
    expect(response.body).to.be.deep.equal({
      message: '"name" length must be at least 5 characters long',
    });
  });

  it('Testa se um produto é editado corretamente usando PUT na rota /products/1', async function () {
    sinon
      .stub(connection, 'execute')
      .onFirstCall()
      .resolves([productList])
      .onSecondCall()
      .resolves(mockProductEditItem);

    const response = await chai
      .request(app)
      .put('/products/1')
      .send({ name: 'Martelo do Batman' });

    const retornoEsperado = {
      id: response.body.id,
      name: 'Martelo do Batman',
    };

    // console.log(response.body)

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(retornoEsperado);
  });

  it('Testa a mensagem de erro quando se quer editar um produto que não existe sando PUT na rota /products/99', async function () {
    // aqui não preciso usar 2 stubs, pois o processo para na validação de id do middleware do service
    sinon.stub(connection, 'execute').resolves([productList]);

    const response = await chai
      .request(app)
      .put('/products/99')
      .send({ name: 'Capa do Harry Potter' });

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: 'Product not found' });
  });

  it('Testa se o produto é deletado ao utilizar o método DELETE na rota /products/1', async function () {
    sinon
      .stub(connection, 'execute')
      .onFirstCall()
      .resolves([productList])
      .onSecondCall()
      .resolves(mockProductDeleteItem);

    const response = await chai.request(app).delete('/products/1');

    expect(response.status).to.be.equal(204);
    expect(response.body).to.be.deep.equal({});
  });

  afterEach(sinon.restore);
});
