const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');
const { mockProductAddItem, mockProductEditItem, mockProductDeleteItem } = require('../../mocks/product.mock');

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

describe('Testando as funções da camada Model.product', function () {
    it('Testa se uma lista com todos os produtos é retornada', async function () {
        sinon.stub(connection, 'execute').resolves([productList]);

        const products = await productModel.findAll();
        // console.log('products', products);

        expect(products).to.deep.equal(productList);
    });

    it('Testa a listagem do produto com id 2', async function () {
        sinon.stub(connection, 'execute').resolves([[productList[1]]]);

        const productID = await productModel.findById(1);
        // console.log('productID', productID);

        expect(productID).to.deep.equal(productList[1]);
    });

    it('Testa a inserção de um novo produto', async function () {
      sinon.stub(connection, 'execute').resolves(mockProductAddItem);

      const insertId = await productModel.addItem('Capa de invisibilidade');

      // console.log(insertId, 'result AQUI');

      expect(insertId).to.be.a('number');
      expect(insertId).to.be.equal(4);
    });

    it('Testa se é possível editar produto', async function () {
      sinon.stub(connection, 'execute').resolves(mockProductEditItem);

      const inputIdProduct = 2;
      const inputNameProduct = 'Capa de invisibilidade';
      const retorno = await productModel.editItem(inputIdProduct, inputNameProduct);

      // console.log(retorno, 'retorno AQUI');

      expect(retorno).to.be.a('array');
      expect(retorno[0]).to.be.a('object');
    });

    it('Testa se é possível deletar produto', async function () {
      sinon.stub(connection, 'execute').resolves(mockProductDeleteItem);

      const inputIdProduct = 2;
      const retorno = await productModel.deleteItem(inputIdProduct);

      // console.log(retorno, 'retorno AQUI');

      expect(retorno).to.be.a('array');
      expect(retorno[0]).to.be.a('object');
    });
    
    afterEach(sinon.restore);
});