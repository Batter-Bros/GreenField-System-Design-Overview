const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';



const getProducts = (id, callback) => {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) throw err;
    let db = client.db('products');
    db.collection('products').find({product_id: +id}).toArray((err, results) => {
      if (err) throw err;
      callback(null, JSON.stringify(results));
    });
  });
}


module.exports = getProducts;