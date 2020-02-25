// var mongoose = require('mongoose');
// // const conn = require('./dbcon.js');
// const path = require('path');
// const fs = require('fs');

// var featuresSchema = mongoose.Schema({
//   feature: [String],
//   value: String
// })

// var Features = mongoose.model('features', featuresSchema)

// var photosSchema = mongoose.Schema(
//   [{
//   url: String,
//   thumbnail_url: String
// }]
// )

// var Photos = mongoose.model('photos', photosSchema)

// var skusSchema = mongoose.Schema({
//       S: Number,
// 			XS: Number,
// 			M: Number,
// 			L: Number,
// 			XL: Number,
// 			XXL: Number
// })

// var Skus = mongoose.model('skus', skusSchema);

// var styleSchema = mongoose.Schema({
//   // style_id: {type: String, unique: true},
//   name: String,
//   original_price: String,
//   sale_price: String,
//   default: Number,
//   photos: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'photos'
//   }
// })

// var Style = mongoose.model('style', styleSchema);

// var productSchema = mongoose.Schema({
//   // feature_id: {
//   //   type: mongoose.Schema.Types.ObjectId,
//   //   ref: 'features',
//   // },
//   // skus_id: {
//     //   type: mongoose.Schema.Types.ObjectId,
//     //   ref: 'skus',
//     //   required: true,
//     // },
//     // style_id: {
//       //   type: mongoose.Schema.Types.ObjectId,
//       //   ref: 'style',
//       //   required: true,
//       // },
//       features: [featuresSchema],
//       skus: [skusSchema],
//       style: [styleSchema],
//       asin: String,
//       id: {type: Number, unique: true},
//       name: String,
//       slogan: String,
//       product_description: String,
//       category: String,
//       default_price: String,
//   // features: {
//   //   type: mongoose.Schema.Types.ObjectId,
//   //   ref: FeaturesModel,
//   // },
//   // skus: {
//   //   type: mongoose.Schema.Types.ObjectId,
//   //   ref: SkusModel
//   // },
//   // style: {
//   //   type: mongoose.Schema.Types.ObjectId,
//   //   ref: StyleModel
//   // }
// });

// var Product = mongoose.model('products', productSchema);


// const essentialProps = ['asin', 'name', 'slogan', 'product_description', 'category', 'default_price'];

// module.exports.get = (asin) => (
//   Product.find({ asin }, {_id:0, __v:0, category:0}).limit(1).lean()
//     .catch(console.error)
// )

// module.exports.getSome = () => (
//   Product.find({}, {_id:0, __v:0, category:0}).limit(100).lean()
//     .catch(console.error)
// );

// module.exports.getAll = () => (
//   Product.find({})
//     .catch(console.error)
// );

// const addToDB = (product) => {
//   console.log('in the add function');
//   return Product.updateOne({ "asin": product.asin }, product, { upsert: true })
//     // .save()
//     .then(prod => {
//       // console.log('added:', JSON.stringify(prod))
//       console.log("asin is:", product.asin)
//       console.log(prod)
//       return prod;
//     })
//     .catch(err => console.log('Error:', err))
// }

// module.exports.add = (product) => {
//   return Product.updateOne({ "asin": `${product.asin}` }, product, { upsert: true })
//     .then(prod => {
//       // console.log('added:', JSON.stringify(prod))
//       console.log(product.asin);
//       console.log(prod)
//       return prod;
//     })
//     .catch(err => {
//       console.log('Error:', err)
//     })
// }

// // New function for bulk addition to DB
// module.exports.bigBatch = (arr, cb) =>{
//   return Product.insertMany(arr)
//     .then(result => {
//       return 'Something got done'
//     })
//     .catch(fail => {
//       return 'Youu messed up'
//     })
// }

// module.exports.addBatch = (JSONarray) => {
//   const products = JSONarray.map(product => {
//     if (essentialProps.every((prop) => product.hasOwnProperty(prop))) {
//       clean(product);
//       //  console.log(product);
//       return product
//     }
//   });
//   let promises = products.map(prod => addToDB(prod));
//   console.log('Promises are', promises);
//   return promises;
//   // return products.map(prod => addToDB(prod));
//   // return Promise.all(products.map(prod => addToDB(prod)));
// }




// module.exports.Product = Product;
// module.exports.Features = Features;
// module.exports.Photos = Photos;
// module.exports.Skus = Skus;
// module.exports.Style = Style;


const mongoose = require('mongoose');
const conn = require('./dbcon.js');
const path = require('path');
const fs = require('fs');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var featuresSchema = mongoose.Schema({
  feature: [String],
  value: String
})

module.exports.Features = mongoose.model('features', featuresSchema)

var photosSchema = mongoose.Schema(
  [{
  url: String,
  thumbnail_url: String
}]
)

module.exports.Photos = mongoose.model('photos', photosSchema)

var skusSchema = mongoose.Schema({
      S: Number,
			XS: Number,
			M: Number,
			L: Number,
			XL: Number,
			XXL: Number
})

module.exports.Skus = mongoose.model('skus', skusSchema);

var styleSchema = mongoose.Schema({
  // style_id: {type: String, unique: true},
  name: String,
  original_price: String,
  sale_price: String,
  default: Number,
  photos: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'photos'
  }
})

module.exports.Style = mongoose.model('style', styleSchema);

var ProductSchema = mongoose.Schema({
      feature_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'features',
        required: true,
      },
      skus_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'skus',
        required: true,
      },
      style_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'style',
        required: true,
      },
        features: [featuresSchema],
      skus: [skusSchema],
      style: [styleSchema],
      asin: String,
      id: {type: Number, unique: true},
      name: String,
      slogan: String,
      product_description: String,
      category: String,
      default_price: String,
      asin: String,
      id: {type: Number, unique: true},
      name: String,
      slogan: String,
      product_description: String,
      category: String,
      default_price: String,
});

module.exports.Product = mongoose.model('Product', ProductSchema);
const essentialProductProps = ['asin', 'id', 'name', 'slogan', 'product_description', 'category', 'default_price'];

const clean = (product) => {
  product.imgURLs = [];
  for (let i = 1; i <= product.totalImages; i++) {
    product.imgURLs.push(`${product.asin}_${i}.jpg`);
  }
}

module.exports.get = (asin) => (
  Product.find({ asin }, {_id:0, __v:0, category:0}).limit(1).lean()
    .catch(console.error)
)

module.exports.getSome = () => (
  Product.find({}, {_id:0}).limit(100).lean()
    .catch(console.error)
);

module.exports.getAll = () => (
  Product.find({})
    .catch(console.error)
);

module.exports.addToDB = (product) => {
  console.log('in the add function');
  return Product.updateOne({ "asin": product.asin }, product, { upsert: true })
    .then(prod => {
      console.log(prod)
      return prod;
    })
    .catch(err => console.log('Error:', err))
}

module.exports.add = (product) => {
  return Product.updateOne({ "asin": `${product.asin}` }, product, { upsert: true })
    .then(prod => {
      console.log(prod)
      return prod;
    })
    .catch(err => {
      console.log('Error:', err)
    })
}
module.exports.bigBatch = (arr, cb) =>{
  return Product.insertMany(arr)
    .then(result => {
      return 'Correct'
    })
    .catch(fail => {
      return 'Error'
    })
}

module.exports.addBatch = (JSONarray) => {
  const products = JSONarray.map(product => {
    if (essentialProductProps.every((prop) => product.hasOwnProperty(prop))) {

      return product
    }
  });
  let promises = products.map(prod => addToDB(prod));
  console.log('Promises are', promises);
  return promises;
  // return products.map(prod => addToDB(prod));
  // return Promise.all(products.map(prod => addToDB(prod)));
}
