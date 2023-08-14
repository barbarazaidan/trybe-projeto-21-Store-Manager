const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
    const [produtos] = await connection.execute(
        'SELECT * FROM StoreManager.products ORDER BY id;',
    );

    return camelize(produtos);
};

module.exports = {
    findAll,
};