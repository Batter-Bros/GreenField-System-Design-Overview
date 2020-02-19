const mongoose = require('mongoose');
const conn = require('./dbcon.js');
const sizeOf = require('image-size');
const path = require('path');
const fs = require('fs');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
  asin: String,
  productTitle: String,
  bulletPoints: Array,
  price: Number,
  category: String,
  totalImages: Number,
  imgURLs: Array,
  imgDimensions: [{
    width: Number,
    height: Number
  }]
});

const Product = mongoose.model('Product', ProductSchema);
const essentialProps = ['asin', 'productTitle', 'bulletPoints', 'price', 'category', 'totalImages'];

const clean = (product) => {
  if (!Array.isArray(product.bulletPoints)) {
    product.bulletPoints = product.bulletPoints.split('\n');
  }
  if (product.price[0] === '$') {
    product.price = product.price.slice(1);
  }
  // product.imgURLs = [];
  // for (let i = 1; i <= product.totalImages; i++) {
  //   product.imgURLs.push(`${product.asin}_${i}.jpg`);
  // }
}

module.exports.get = (asin) => (
  Product.find({ asin }, {_id:0, __v:0, category:0}).limit(1).lean()
    .catch(console.error)
)

module.exports.getSome = () => (
  Product.find({}, {_id:0, __v:0, category:0}).limit(100).lean()
    .catch(console.error)
);

module.exports.getAll = () => (
  Product.find({})
    .catch(console.error)
);

const addToDB = (product) => {
  console.log('in the add function');
  return Product.updateOne({ "asin": product.asin }, product, { upsert: true })
    // .save()
    .then(prod => {
      // console.log('added:', JSON.stringify(prod))
      console.log("asin is:", product.asin)
      console.log(prod)
      return prod;
    })
    .catch(err => console.log('Error:', err))
}

module.exports.add = (product) => {
  return Product.updateOne({ "asin": `${product.asin}` }, product, { upsert: true })
    .then(prod => {
      // console.log('added:', JSON.stringify(prod))
      console.log(product.asin);
      console.log(prod)
      return prod;
    })
    .catch(err => {
      console.log('Error:', err)
    })
}

// New function for bulk addition to DB
module.exports.bigBatch = (arr, cb) =>{
  return Product.insertMany(arr)
    .then(result => {
      return 'Something got done'
    })
    .catch(fail => {
      return 'Youu messed up'
    })
}

module.exports.addBatch = (JSONarray) => {
  const products = JSONarray.map(product => {
    if (essentialProps.every((prop) => product.hasOwnProperty(prop))) {
      clean(product);
      //  console.log(product);
      return product
    }
  });
  let promises = products.map(prod => addToDB(prod));
  console.log('Promises are', promises);
  return promises;
  // return products.map(prod => addToDB(prod));
  // return Promise.all(products.map(prod => addToDB(prod)));
}
