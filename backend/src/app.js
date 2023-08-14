const express = require('express');

const { productController, saleController } = require('./controllers');
const { 
  validaProductId,
  validaNumberQuantity,
  validaQuantity,
  validaEditaQuantity,
  validaEditaNumberQuantity,
} = require('./middlewares/validations.sales');

const { validaName, validaTamanhoName } = require('./middlewares/validations.product');

const app = express();
app.use(express.json());

app.get('/products', productController.findAllProducts);

app.get('/products/:id', productController.findProductById);

app.post('/products', validaName, validaTamanhoName, productController.addNewProduct);

app.put('/products/:id', validaName, validaTamanhoName, productController.editProduct);

app.delete('/products/:id', productController.deleteProduct);

app.get('/sales', saleController.findAllSales);

app.get('/sales/:id', saleController.findSaleById);

app.put(
  '/sales/:saleId/products/:productId/quantity',
  validaEditaQuantity,
  validaEditaNumberQuantity,
  saleController.editProductQuantity,
);

app.post(
  '/sales', 
  validaProductId,
  validaQuantity,
  validaNumberQuantity,
  saleController.addNewSale,
  );

app.delete('/sales/:id', saleController.deleteSale);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
