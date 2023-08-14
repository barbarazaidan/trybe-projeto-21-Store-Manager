const express = require('express');

const app = express();
app.use(express.json());

const { productController } = require('./controllers');

app.get('/products', productController.findAllProducts);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
