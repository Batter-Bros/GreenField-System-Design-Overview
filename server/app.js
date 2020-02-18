const express = require('express');
const compression = require('compression');
const app = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../db/getProducts.js');


app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use('/', express.static(path.resolve(__dirname, '../client/dist')));

app.get('/products', (req, res) => {
  console.log('Getting some items:')
  db.findAll()
    .then(products => res.json(products))
    .catch(console.error)
});



app.get('/products/:product_id', (req, res) => {
  console.log('getting a specific product')
  db.get(req.params.product_id)
    .then(products => res.json(products[0]))
    .catch(console.error)
});

// app.get('/products/:product_id', (req, res) => {
//   console.log('getting a specific product')
//   db.get(req.params.product_id)
//     .then(product => res.json(product))
//     .catch(console.error)
// });

app.post('/products', (req, res) => {
  db.addToDB(req.body)
    .then((data) => {
      console.log('products/:product_id', data)
      res.send('Product has been added');
    })
    .catch(() => res.end())
});


module.exports = app;