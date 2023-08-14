const chai = require('chai');
const chaiHttp = require('chai-http');
const { formatacaoChaves, formatacaoValores } = require('../../../src/utils/formatacao');

const { expect, use } = chai;

use(chaiHttp);

describe('Testando as funções de formatação', function () {
    it('Testa se a função "formatacaoChaves" retorna uma string no formato correto', async function () {
        const objeto = { 
            saleId: 2,
            productId: 1,
            quantity: 1,
        };

          const stringEsperada = 'sale_id, product_id, quantity';

          const resultado = formatacaoChaves(objeto);

        expect(resultado).to.be.equal(stringEsperada);
    });

    it('Testa se a função "formatacaoValores" retorna um array no formato correto', async function () {
        const objeto = { 
            saleId: 2,
            productId: 1,
            quantity: 4,
        };

          const retornoEsperado = [2, 1, 4];

          const resultado = formatacaoValores(objeto);

        expect(resultado).to.be.deep.equal(retornoEsperado);
    });
});