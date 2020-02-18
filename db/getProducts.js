const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose')
const uri = 'mongodb://localhost:27017';

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

function findAll(callback) {
  ProductModel.find({}, callback);
}


function findOne(id, callback) {
  ProductModel.find({id: id}, callback);
}

function insertOne(product, callback) {
  ProductModel.create(product, callback);
}

function findMany(ids, callback) {
  ProductModel.find({id: {$in: ids}}, callback);
}

function count(){
  return ProductModel.count();
}

function addToDB(product){
  console.log('in the add function');
  return Product.updateOne({ "id": product.id }, product, { upsert: true })
    // .save()
    .then(prod => {
      // console.log('added:', JSON.stringify(prod))
      console.log("id is:", product.id)
      console.log(prod)
      return prod;
    })
    .catch(err => console.log('Error:', err))
}

function add(product) {
  return Product.updateOne({ "id": `${product.id}` }, product, { upsert: true })
    .then(prod => {
      console.log(product.id);
      console.log(prod)
      return prod;
    })
    .catch(err => {
      console.log('Error:', err)
    })
}

module.exports = {
  dataLoader,
  deleteAllProducts,
  add,
  addToDB,
  findOne,
  findAll,
  insertOne,
  findMany,
  count
};