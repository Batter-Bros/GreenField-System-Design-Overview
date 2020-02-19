const mongoose = require('mongoose');
const dbURI = process.env.DBURI || 'localhost:8000/products'
// require('../config.js').dbURI

// module.exports = mongoose.connect(dbURI, {useNewUrlParser: true});
module.exports = mongoose.connect('mongodb://localhost:27017/productMain', {useNewUrlParser: true});