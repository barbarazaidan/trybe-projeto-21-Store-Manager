const mockProductFindAll = [
    [
    { id: 1, name: 'Martelo de Thor' },
    { id: 2, name: 'Traje de encolhimento' },
    { id: 3, name: 'Escudo do CapitÃ£o AmÃ©rica' },
    ],
];

const mockProductFindById = [
    [{ id: 1, name: 'Martelo de Thor' }],
];

const mockProdutoEditado = {
  id: 2,
  name: 'Capa de invisibilidade Harry Potter',
};

const mockProductAddItem = [
    {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 4,
      info: '',
      serverStatus: 2,
      warningStatus: 0,
    },
    undefined,
  ];

  const mockProductEditItem = [
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

  const mockProductDeleteItem = [
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

  const mockProductServiceFindAll = { status: 200, data: productList };

  const mockProductServiceFindById = { 
    status: 200, data: { id: 2, name: 'Traje de encolhimento' },
  };

  const mockProductServiceFindByIdErro = { status: 404, data: { message: 'Product not found' } };

  const mockProductServiceAddItem = { 
    status: 201, data: { id: 4, name: 'Capa de invisibilidade' },
  };

  const mockProductServiceAddItemSemName = { status: 400, data: { message: '"name" is required' } };

  const mockProductServiceAddItemNamePequeno = { 
    status: 422, data: { message: '"name" length must be at least 5 characters long' },
  };

  const mockProductServiceEditItem = { status: 200, data: mockProdutoEditado };

  const mockProductServiceEditItemErro = { status: 404, data: { message: 'Product not found' } };

  const mockProductServiceDeleteItem = { status: 204 };

  const mockProductServiceDeleteItemErro = { status: 404, data: { message: 'Product not found' } };

module.exports = {
    mockProductFindAll,
    mockProductFindById,
    mockProductAddItem,
    productList,
    mockProductEditItem,
    mockProductDeleteItem,
    mockProductServiceFindAll,
    mockProductServiceAddItem,
    mockProductServiceAddItemSemName,
    mockProductServiceAddItemNamePequeno,
    mockProductServiceDeleteItem,
    mockProductServiceDeleteItemErro,
    mockProductServiceFindById,
    mockProductServiceFindByIdErro,
    mockProductServiceEditItem,
    mockProductServiceEditItemErro,
};
