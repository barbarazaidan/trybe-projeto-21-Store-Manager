const snakeize = require('snakeize');

const formatacaoChaves = (elemento) => {
    const stringDeChaves = Object.keys(snakeize(elemento)).join(', ');
    return stringDeChaves;
};

const formatacaoValores = (elemento) => {
    const arrayDeValores = Object.values((elemento));
    return arrayDeValores;
};

module.exports = {
    formatacaoChaves,
    formatacaoValores,
};