const express = require('express');
const app = express();
const mongooseErrors = require('./libs/mongooseValidationErrors');

const config = require('./config.json');

const mongoose = require('mongoose');
mongoose.connect(config.db.path, { useNewUrlParser: true});

const routes = require('./routes');

app.use(express.json());

app.use('/api', routes);

app.use((req, res, next) => {
    next(notFound('Not found'));
});

app.use((error, req, res, next) => {
    if(error.name === 'ValidationError' && error.errors) {
        res.status(400).send(mongooseErrors(error.errors));
    }
    next(error);
});


app.listen(config.port);