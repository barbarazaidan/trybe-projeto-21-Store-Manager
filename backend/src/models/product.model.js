const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
    const [produtos] = await connection.execute(
        'SELECT * FROM StoreManager.products ORDER BY id;',
    );

    return camelize(produtos);
};

const findById = async (id) => {
    const [[produto]] = await connection.execute(
        'SELECT * FROM StoreManager.products WHERE id = ?;',
        [id],
    );
    return camelize(produto);
};

const addItem = async (name) => {
    // a resposta do banco sempre traz um array
    // no caso de insert, delete, update, retorno é [{}, null]
    // o objeto tem várias chaves com alguns metadados e uma delas é insertId

    const [{ insertId }] = await connection.execute(
        'INSERT INTO StoreManager.products (name) VALUES (?);',
        [name],
    );

    return (insertId);
};

const editItem = async (productId, name) => // aqui estou retornando o próprio connection.execute e como na chamada do service já tem await, não precisa colocar aqui
    connection.execute(
        'UPDATE StoreManager.products SET name = ? WHERE id = ?;',
        [name, productId],
    );

const deleteItem = async (id) => // mesma coisa do item acima
    connection.execute(
        'DELETE FROM StoreManager.products WHERE id = ?;',
        [id],
    );

module.exports = {
    findAll,
    findById,
    addItem,
    editItem,
    deleteItem,
};