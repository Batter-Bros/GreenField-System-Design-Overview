const faker = require('faker');

function createObjPhoto(i) {
  const dummyPhoto = {};
  dummyPhoto.id = i;
  dummyPhoto.url = `https://images.unsplash.com/photo-${faker.random.number({min:1, max:10000})}`;
  dummyPhoto.thumbnail_url = `https://images.unsplash.com/photo-${faker.random.number({min:1, max:10000})}`
  return dummyPhoto;
}

function createObjFeature(j) {
  const dummyFeature = {};
  dummyFeature.id = j;
  dummyFeature.feature = faker.commerse.productAdjective();
  dummyFeature.value = faker.lorem.word()
  return dummyFeature;

}

let counter = 0;
let temp = 0;

function createObjProduct(k) {

  const dummyData = {};
  dummyData.id = k;
  dummyData.product_id = n;
  dummyData.name = faker.commerce.productName();
  dummyData.slogan = faker.lorem.word()
  dummyData.product_description = faker.lorem.sentence({min:1, max:10})
  dummyData.category = faker.commerce.productAdjective()
  dummyData.default_price = faker.random.number({min: 1, max: 100})
  dummyData.style_id = n,
  dummyData.skus = {
    S: faker.random.number({min: 1, max: 100}),
    XS: faker.random.number({min: 1, max: 100}),
    M: faker.random.number({min: 1, max: 100}),
    L: faker.random.number({min: 1, max: 100}),
    XL: faker.random.number({min: 1, max: 100}),
    XXL: faker.random.number({min: 1, max: 100})
  }
  dummyData.name = faker.commerce.productName;
  dummyData.original_price = faker.random.number({min:1, max:1000})
  dummyData.sale_price = faker.random.number({min:1, max:1000})

  return dummyData;
}

function createBulkPhoto(i) {
  const arrBiz = [];

  for (let init = i; init < i + 1000; init++) {
    arrBiz.push(createObjPhoto(init));
  }

  if (i % 100000 === 0) {
    console.log('biz', i);
  }

  return arrBiz;
}

function createBulkFeature(j) {
  const arrUser = [];

  for (let init = j; init < j + 1000; init++) {
    arrUser.push(createObjFeature(init));
  }

  if (j % 100000 === 0) {
    console.log('user', j);
  }

  return arrUser;
}

function createBulkProduct(k) {
  const arrPhoto = [];

  for (let init = k; init < k + 1000; init++) {
    arrPhoto.push(createObjProduct(init));
  }

  if (k % 100000 === 0) {
    console.log('photo', k);
  }
  return arrPhoto;
}

module.exports.createBulkPhoto = createBulkPhoto;
module.exports.createBulkFeature = createBulkFeature;
module.exports.createBulkProduct = createBulkProduct;
