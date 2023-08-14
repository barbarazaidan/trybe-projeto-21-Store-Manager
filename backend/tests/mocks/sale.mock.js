const mockFuncaoFindAllModel = [
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

  const mockFuncaoFindByIdModel = [
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

  const mockFuncaoFindByIdModelIdInexistente = [];

  const mockFuncaoAddNewSaleModel = [
    {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 3,
      info: '',
      serverStatus: 2,
      warningStatus: 0,
    },
    undefined,
  ];

  const mockNewSale = {
    id: 3,
    itemsSold: [
      {
        productId: 1,
        quantity: 100,
      },
      {
        productId: 2,
        quantity: 55,
      },
    ],
  };

  const mockSaleEditQuantity = {
    date: '2023-08-03T17:44:03.315Z',
    productId: 2, 
    quantity: 250,
    saleId: 1,
  };

  const mockFuncaoAddItemModel = [
    {
      insertId: 3,
    },
  ];

  const mockFuncaoDeleteItemModelSalesProducts = [
    {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      info: '',
      serverStatus: 2,
      warningStatus: 0,
    },
    undefined,
  ];

  const mockFuncaoDeleteItemModelSales = [
    {
      fieldCount: 0,
      affectedRows: 2,
      insertId: 0,
      info: '',
      serverStatus: 2,
      warningStatus: 0,
    },
    undefined,
  ];

  const mockFuncaoEditQuantity = [
    {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      info: 'Rows matched: 1  Changed: 1  Warnings: 0',
      serverStatus: 2,
      warningStatus: 0,
      changedRows: 1,
    },
    undefined,
  ];

  const mockSaleServiceFindAll = { status: 200, data: mockFuncaoFindAllModel };

  const mockSaleServiceFindById = { status: 200, data: mockFuncaoFindByIdModel };

  const mockSaleServiceFindByIdErro = { status: 404, data: { message: 'Sale not found' } };

  const mockSaleServiceAddItem = { status: 201, data: mockNewSale };

  const mockSaleServiceAddItemErro = { status: 404, data: { message: 'Product not found' } };

  const mockSaleServiceDeleteItem = { status: 204 };

  const mockSaleServiceDeleteItemErro = { status: 404, data: { message: 'Sale not found' } };

  const mockSalesServiceEditQuantity = { status: 200, data: mockSaleEditQuantity };

  const mockSalesServiceEditQuantityErroProduto = { 
    status: 404, data: { message: 'Product not found in sale' },
  };

  const mockSalesServiceEditQuantityErroSale = { 
    status: 404, data: { message: 'Sale not found' },
  };

  module.exports = {
    mockFuncaoFindAllModel,
    mockFuncaoFindByIdModel,
    mockFuncaoAddNewSaleModel,
    mockFuncaoAddItemModel,
    mockFuncaoDeleteItemModelSalesProducts,
    mockFuncaoDeleteItemModelSales,
    mockFuncaoFindByIdModelIdInexistente,
    mockFuncaoEditQuantity,
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
  };