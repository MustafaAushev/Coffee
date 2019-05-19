const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    phones: [String],
    mails: [String]
});

module.exports = mongoose.model('contact', contactSchema);