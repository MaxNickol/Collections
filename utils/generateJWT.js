const jwt = require('jsonwebtoken');
const {secret} = require('../config/config');

const generateAccessToken = (id, roles) => {
    return jwt.sign({id, roles}, secret, {expiresIn: "2h"});
 }

 module.exports = generateAccessToken;