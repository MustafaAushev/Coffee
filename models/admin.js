const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    login: String,
    password: String
});

module.exports = mongoose.model('admin', adminSchema);