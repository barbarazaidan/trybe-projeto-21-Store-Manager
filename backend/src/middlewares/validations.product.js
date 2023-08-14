const validaName = async (req, res, next) => {
    const { name } = req.body;
    if (name === undefined) {
        return res.status(400).json({ message: '"name" is required' });
    }

    next();
};

const validaTamanhoName = async (req, res, next) => {
    const { name } = req.body;
    if (name.length <= 4) {
        return res.status(422).json(
            { message: '"name" length must be at least 5 characters long' },
        );
    }
    
    next();
};

module.exports = {
    validaName,
    validaTamanhoName,
};