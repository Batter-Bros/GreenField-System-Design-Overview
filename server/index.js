const express = require('express');
const morgan = require('morgan');
const path = require('path');
const products = require('../db/models/retail.js')
const getProducts = require('../db/getProducts.js')
const cors = require('cors')

const port = 3001;
const app = express();
app.use(cors())
app.use(morgan('dev'));
app.use('/:product_id', express.static(path.join(__dirname, '../client')));

app.get('/products/:product_id', (req, res) => {
  getProducts(req.params.products, (err, results) => {
    if (err) console.error('Error querying database...');
    else {
      res.send(results);
    }
  });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
