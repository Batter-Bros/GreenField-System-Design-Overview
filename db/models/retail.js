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

var styleSchema = mongoose.Schema({
  style_id: {type: String, unique: true},
  name: String,
  original_price: String,
  sale_price: String,
  default: Number,
  photos: photosSchema  ,
})

var productSchema = mongoose.Schema({
  id: {type: Number, unique: true},
  name: String,
  slogan: String,
  product_description: String,
  category: String,
  default_price: String,
  features: [featuresSchema],
  skus: skusSchema,
  style: styleSchema
});

var ProductModel = mongoose.model('product', productSchema);





exports.ProductModel = ProductModel;


