const camelize = require('camelize');
const connection = require('./connection');
const { formatacaoChaves, formatacaoValores } = require('../utils/formatacao');

const findAll = async () => {
    const query = `
    SELECT 
        prod.sale_id, sales.date, prod.product_id, prod.quantity 
    FROM 
        StoreManager.sales_products as prod
            INNER JOIN
        StoreManager.sales as sales ON prod.sale_id = sales.id
    ORDER BY prod.sale_id, prod.product_id;
    `;

    const [sales] = await connection.execute(query);
    // console.log(sales);
    return camelize(sales);
};

const findById = async (id) => {
    const query = `
    SELECT 
        sales.date, 
        prod.product_id, 
        prod.quantity 
    FROM 
        StoreManager.sales_products as prod
            INNER JOIN
        StoreManager.sales as sales ON prod.sale_id = sales.id
    WHERE
    sales.id= ?
    ORDER BY prod.sale_id, prod.product_id;
    `;
    const [sale] = await connection.execute(query, [id]); // sem a desconstrução retorna [[], []]
    return camelize(sale);
};

const addNewSale = async (infoSales, insertId) => {
    infoSales.forEach(async (elemento) => {
        const query = `
            INSERT INTO StoreManager.sales_products 
                (sale_id, ${formatacaoChaves(elemento)}) 
            VALUES (?, ?, ?);
        `;

       await connection
            .execute(query, [insertId, ...formatacaoValores(elemento)]);
    });
};

const addItem = async (infoSales) => {
    // console.log('infosales', infoSales);
    // a resposta do banco sempre traz um array
    // no caso de insert, delete, update, retorno é [{}, null]
    // o objeto tem várias chaves com alguns metadados e uma delas é insertId

    const [{ insertId }] = await connection.execute(
        'INSERT INTO StoreManager.sales () VALUES ();',
    );
   
    // console.log(insertId, 'insertId');

    await addNewSale(infoSales, insertId); // quando tentei colocar a função dentro do addItem, ela não esperava o await

    return (insertId);
};

const deleteSalesProduct = async (idSale) =>
    connection.execute(
        'DELETE FROM StoreManager.sales_products WHERE sale_id = ?;',
        [idSale],
    );

const deleteSales = async (idSale) =>
    connection.execute(
        'DELETE FROM StoreManager.sales WHERE id = ?;',
    [idSale],
    );

const deleteItem = async (idSale) => {
   await deleteSalesProduct(idSale);
   return deleteSales(idSale); // usei os retornos para facilitar na hora de fazer os testes unitários
};

const editQuantity = async (saleId, productId, quantity) => {
    const query = `
    UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?;
    `;

    return connection.execute(query, [quantity, saleId, productId]);
};

module.exports = {
    findAll,
    findById,
    addItem,
    deleteItem,
    editQuantity,
};