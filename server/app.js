// const express = require('express');
// const compression = require('compression');
// const app = express();
// const cors = require('cors');
// const path = require('path');
// const bodyParser = require('body-parser');
// const db = require(path.resolve(__dirname, '../database/index.js'));
// // const db = require(path.resolve(__dirname, '../database/pgindex.js'));


// app.use(compression());
// app.use(cors());
// app.use(bodyParser.json());
// app.use('/', express.static(path.resolve(__dirname, '../client/dist')));

// app.get('/products', (req, res) => {
//   console.log('Getting some items:')
//   db.getSome()
//     .then(products => res.json(products))
//     .catch(console.error)
// });

// // *****************  For mongoDB return **************
// app.get('/products/random', (req, res) => {
//   let asin = Math.floor(Math.random() * 10000000) + 1;
//   // let asin = 1500000;
//   // console.log('Getting a random item:', asin)
//   db.get(asin)
//     .then(products => res.json(products[0]))
//     .catch(console.error)
// });


// app.get('/products/:asin', (req, res) => {
//   console.log('getting a specific product')
//   db.get(req.params.asin)
//     .then(products => res.json(products[0]))
//     .catch(console.error)
// });
// // *************** End MongoDB fx *************


// // ************* Start psql fx ************
// // app.get('/products/random', (req, res) => {
// //   let asin = Math.floor(Math.random() * 10000000) + 1;
// //   // let asin = 1500000;
// //   console.log('Getting a random item:', asin)
// //   db.get(asin)
// //     .then(product => res.json(product))
// //     .catch(console.error)
// // });


// // app.get('/products/:asin', (req, res) => {
// //   console.log('getting a specific product')
// //   db.get(req.params.asin)
// //     .then(product => res.json(product))
// //     .catch(console.error)
// // });
// // **************** End psql fx **************

// app.post('/products/:asin', (req, res) => {
//   db.add(req.body)
//     .then((data) => {
//       console.log('products/:asin', data)
//       res.send('Product has been added');
//     })
//     .catch(() => res.end())
// });


// // Then is failing => Research
// app.post('/products', (req, res) => {
//   //  console.log(req.body)
//   let promises = db.addBatch(req.body);
//   // console.log(promises);
//   Promise.all(promises)
//     .then(result => res.send('Products added'))
//     .catch((err) => {
//       console.log('Error adding products:', err);
//       res.end('Error');
//     })

// })

// module.exports = app;

// import {Models, ProductModel, SkusModel, StyleModel, PhotosModel} from '../db/models/retail.js'
const Models = require('../db/models/retail')
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose')
var bodyParser = require('body-parser');
var MongoClient = require('mongodb')

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'public')));

//API Service
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/products')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

const uri = 'mongodb://localhost:27017';

mongoose.connect('mongodb://localhost:27017/products', {useNewUrlParser: true})

const db = mongoose.connection;

  MongoClient.connect(uri, {useNewUrlParser: true})


var router = express.Router();

//create api route
app.use('/api', router);
app.use('/api/products', router);

app.post('/api', function(req, res) {
  res.json({ message: 'API Root!' });
});

app.post('/api/products', function(req, res) {
  var product = new Models.ProductModel();
  var feature = new Models.FeaturesModel();
  var skus = new Models.SkusModel();
  var style = new Models.StyleModel();
  var photo = new Models.PhotosModel();

  feature.id = req.param('id');
  feature.style_id = req.param('style_id');
  feature.feature = req.param('feature');
  feature.value = req.param('value');

  photo.id = req.param('id');
  photo.style_id = req.param('style_id');
  photo.feature = req.param('url');
  photo.value = req.param('thumbnail_url');

  skus.id = req.param('id');
  skus.style_id = req.param('style_id')
  skus.S = req.param('S')
  skus.XS = req.param('XS')
  skus.M = req.param('M')
  skus.L = req.param('L')
  skus.XL = req.param('XL')
  skus.XXL = req.param('XXL')

  style.style_id = req.param('style_id');
  style.name = req.param('name');
  style.original_price = req.param('original_price');
  style.sale_price = req.param('sale_price');
  style.default = req.param('default');
  style.photos = [photo]


  product.id = req.param('id');
  product.name = req.param('name');
  product.slogan = req.param('slogan');
  product.description = req.param("description");
  product.category = req.param("category");
  default_price = req.param("default_price");
  product.features = feature;
  product.skus = skus;
  product.style = style;

  product.save(function(err) {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'Product created' });
  });
});

app.get('/api/products', function(req, res) {
  ProductModel.find(function(err, streams) {
    if (err) {
      res.send(err);
    }

    res.json(streams);
  });
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
