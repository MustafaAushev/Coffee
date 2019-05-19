const express = require('express');
const router = express.Router();

router.use('/admins', require('./adminRouter'));

module.exports = router;