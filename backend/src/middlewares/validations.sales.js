const validaProductId = async (req, res, next) => {
    const dadosDoBody = req.body;
  
    const isProductId = dadosDoBody
    .every((objeto) => Object.keys(objeto).find((chave) => chave === 'productId'));
 
    if (!isProductId) {
        return res.status(400).json({ message: '"productId" is required' });
    }
    next();
};

const validaQuantity = async (req, res, next) => {
    const dadosDoBody = req.body;

    const isQuantity = dadosDoBody
        .every((objeto) => Object.keys(objeto).find((chave) => chave === 'quantity'));

    if (!isQuantity) {
        return res.status(400).json({ message: '"quantity" is required' });
    }

    next();
};

const validaEditaNumberQuantity = async (req, res, next) => {
    const { quantity } = req.body;

    if (quantity === 0) {
        return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }

    next();
};

const validaEditaQuantity = async (req, res, next) => {
    const { quantity } = req.body;

    if (quantity === undefined) {
        return res.status(400).json({ message: '"quantity" is required' });
    }

    next();
};

const validaNumberQuantity = async (req, res, next) => {
    const dadosDoBody = req.body;

    const isZeroQuantity = dadosDoBody.some(({ quantity }) => quantity <= 0);

    if (isZeroQuantity) {
        return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }

    next();
};

module.exports = {
    validaProductId,
    validaQuantity,
    validaNumberQuantity,
    validaEditaNumberQuantity,
    validaEditaQuantity,
};