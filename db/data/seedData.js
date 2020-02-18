const faker = require('faker');

function createOneData(n) {
  const dummyData = {
    product_id: n,
    name: null,
    slogan: null,
    product_description: null,
    category: null,
    default_price: null,
    features: [],
    style: null
  };

  let styleObj = {
    style_id: null,
    skus: {
      S: null,
      XS: null,
      M: null,
      L: null,
      XL: null,
      XXL: null
    },
    photos: [],
    name: null,
    original_price: null,
    sale_price: null,

  }

  let featuresObj = {
    feature: null,
    value: null
  }

  let photoObj = {
    url: null,
    thumbnail_url: null,
  };


  dummyData.product_id = n;
  dummyData.name = faker.commerce.productName();
  dummyData.slogan = faker.lorem.word()
  dummyData.product_description = faker.lorem.sentence({min:1, max:10})
  dummyData.category = faker.commerce.productAdjective()
  dummyData.default_price = faker.random.number({min: 1, max: 100})


  styleObj.style_id = n,
  styleObj.skus = {
    S: faker.random.number({min: 1, max: 100}),
    XS: faker.random.number({min: 1, max: 100}),
    M: faker.random.number({min: 1, max: 100}),
    L: faker.random.number({min: 1, max: 100}),
    XL: faker.random.number({min: 1, max: 100}),
    XXL: faker.random.number({min: 1, max: 100})
  }
  styleObj.name = faker.commerce.productName;
  styleObj.original_price = faker.random.number({min:1, max:1000})
  styleObj.sale_price = faker.random.number({min:1, max:1000})


  for (let i = 0; i < 10; i++) {
    photoObj.url = `https://images.unsplash.com/photo-${faker.random.number({min:1, max:1000})}`;
    photoObj.thumbnail_url = `https://images.unsplash.com/photo-${faker.random.number({min:1, max:10000})}`;

    styleObj.photos.push(photoObj);
    photoObj = {};
  }
  for (let j = 0; j < 5; j++) {
    featuresObj.feautre = faker.commerce.productAdjective();
    featuresObj.value = faker.lorem.word();

    dummyData.reviews.push(featuresObj);
    featuresObj = {};

  }
  dummyData.style = styleObj

  return styleObj, featureObj, photoObj, dummyData;
}

function createBulkData(i) {
  const arr = [];

  for (let init = i; init < i + 1000; init++) {
    arr.push(createOneData(init));
  }

  return arr;
}

module.exports.createBulkData = createBulkData;
