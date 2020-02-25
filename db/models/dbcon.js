const mongoose = require('mongoose');
const dbURI = process.env.DBURI ||   'mongodb://ec2-34-217-80-228.us-west-2.compute.amazonaws.com:27017/products'


// module.exports = mongoose.connect(dbURI, {useNewUrlParser: true});
module.exports = mongoose.connect('mongodb://localhost:27017/products', {useNewUrlParser: true});