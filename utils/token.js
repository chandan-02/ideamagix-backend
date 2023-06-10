const moment = require('moment');
const jwt = require("jsonwebtoken");

const generateToken = (userId, expires, secret = process.env.JWT_SECRET) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
    };
    return jwt.sign(payload, secret);
};


module.exports = {
    generateToken,
}