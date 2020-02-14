var mongoose = require('mongoose');

var featuresSchema = mongoose.Schema({
  feature: [String],
  value: String
})
var photosSchema = mongoose.Schema(
  [{
  url: String,
  thumbnail_url: String
}]
)

var skusSchema = mongoose.Schema({
      S: Number,
			XS: Number,
			M: Number,
			L: Number,
			XL: Number,
			XXL: Number
})

var productSchema = mongoose.Schema({
  id: Number,
  name: String,
  product_id: { type: String, unique: true },
  slogan: String,
  product_description: String,
  category: String,
  default_price: String,
  features: [featuresSchema],
  style_id: {type: String, unique: true},
  skus: skusSchema,
  original_price: String,
  sale_price: String,
  default: Number,
  photos: [photosSchema  ],

});

var ProductModel = mongoose.model('product', productSchema);

function findAll(callback) {
  ProductModel.find({}, callback);
}


function findOne(id, callback) {
  ProductModel.find({product_id: id}, callback);
}

function insertOne(product, callback) {
  ProductModel.create(product, callback);
}

function findMany(ids, callback) {
  ProductModel.find({place_id: {$in: ids}}, callback);
}

function count(){
  return ProductModel.count();
}

exports.ProductModel = ProductModel;
exports.findOne = findOne;
exports.findAll = findAll;
exports.insertOne = insertOne;
exports.findMany = findMany;
exports.count = count;

