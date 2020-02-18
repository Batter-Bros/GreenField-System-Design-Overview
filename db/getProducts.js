const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017';

const options = {
  useNewUrlParser: true
};

mongoose.connect('mongodb://localhost:27017/products', options)


const db = mongoose.connection;
function dataLoader(JSONarray) {
  const dbName = 'products';
  const collectionName = 'products';
  return MongoClient.connect(uri, options)
  .then(connection => {
    return connection
      .db(dbName)
      .collection(collectionName)
      .insertMany(JSONarray);
  })
  .then(result => {
    return result;
  })
  .catch(err => {
    console.log('Error in data loader', err);
  });
}

function deleteAllProducts() {
  const dbName = 'products';
  const collectionName = 'products';
  return MongoClient.connect(uri, options)
  .then(connection => {
    return connection
      .db(dbName)
      .collection(collectionName)
      .remove({});
  })
  .then(result => {
    return result;
  })
  .catch(err => {
    console.log('Error in deleteAllProducts', err);
  });
}



module.exports = {
  getOne,
  dataLoader,
  deleteAllProducts,
};