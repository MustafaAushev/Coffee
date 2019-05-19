const express = require('express');
const router = express.Router();
const vvdevAuth = require('vvdev-auth');
const jwt = require('../libs/jwt');
const { Admin, Contact } = require('../models');
const checkAdminAuth = jwt.adminAuthMiddleware;
const { unauthorized } = require('boom');

router.post('/', (req, res, next) => {
    Admin.findOne({login: req.body.login})
        .then(admin => {
            if (!admin) throw unauthorized('Ошибка авторизации');
            return vvdevAuth.hashPassword(req.body.password)
                .then(hash => {
                    if (hash !== admin.password) throw unauthorized('Ошибка авторизации');
                    return jwt.sign({
                        id: admin._id,
                        login: admin.login
                    })
                        .then(token => res.send({token}));
                });
        })
        .catch(err => next(err));
});

router.get('/contacts', checkAdminAuth, (req, res, next) => {
    Contact.findOne({}, {_id: 0})
        .then(contacts => {  
            if (!contacts) return res.send({});
            res.send({contacts});
        })
        .catch(err => next(err));
});

router.put('/contacts', checkAdminAuth, (req, res, next) => {
    Contact.findOne({}, {_id: 0})
        .then(contacts => {
            if (!contacts) contacts = new Contact({});
            contacts.phones = req.body.phones;
            contacts.emails = req.body.emails;
            return contacts.save()
                .then(() => res.send({message: 'Изменения сохранены'}));
        })
        .catch(err => next(err));
});
module.exports = router;