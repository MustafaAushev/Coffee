const jwt = require('jsonwebtoken');
const config = require('../config.json');
const jwtKey = config.key.jwt;
const { unauthorized } = require('boom');

exports.sign = (body) => {
    return new Promise((resolve, reject) => {
        jwt.sign(body, jwtKey, (err, token) => {
            if (err) reject(err);
            resolve(token);
        });
    });
};

exports.authMiddleware = (req, res, next) => {
    let jwtToken = req.headers['x-access-token'];
    if (!jwtToken) next(unauthorized('Ошибка авторизации'));
    jwt.verify(jwtToken, jwtKey, async (error, data) => {
        if(error)  next(unauthorized('Ошибка авторизации'));
        req.authData = data;
        if (!req.authData) next(unauthorized('Ошибка авторизации'));
        next();
    });
};


exports.adminAuthMiddleware = (req, res, next) => {
    let jwtToken = req.headers['x-access-token'];
    if (!jwtToken) next(unauthorized('Ошибка авторизации'));
    jwt.verify(jwtToken, jwtKey, async (error, data) => {
        if(error) next(unauthorized('Ошибка авторизации'));
        req.authData = data;
        if (!req.authData || !req.authData.id || !req.authData.login) next(unauthorized('Ошибка авторизации'));
        next();
    });
};

