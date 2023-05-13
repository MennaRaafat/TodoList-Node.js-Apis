const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { asycnWrapper } = require('../lib');
const User = require('../modles/User')

const asyncJwtVerify = promisify(jwt.verify);

const { JWT_SECRET = 'test' } = process.env;

const auth = async (req, res, next) => {
    const { headers: { authorization } } = req;
    const payload = asyncJwtVerify(authorization, JWT_SECRET);
    const [error, data] = await asycnWrapper(payload);
    if (error) {
        return next(error);
    }
    const user = await User.findById(data.id);
    if (!user) {
        return next(new Error('User not found'));
    }
    req.user = user;
    return next();
};
module.exports = {
    auth
};
