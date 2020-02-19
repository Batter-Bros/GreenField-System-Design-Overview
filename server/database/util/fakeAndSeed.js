const db = require('../index.js');
const faker = require('faker');

console.log('Started at:', new Date);
(async () => {

  for (let i = 1; i < 10000000; i += 100) {
    // console.log('Creating asin:', i)
    let all = [];
    for (let k = i; k < i + 100; k++) {

      let record = {};
      record.asin = k;
      record.attributes = faker.commerce.productMaterial();
      record.bulletPoints = [faker.company.bs(), faker.company.bs(), faker.company.bs()];
      record.category = faker.commerce.department();
      record.price = faker.commerce.price();
      record.productTitle = faker.commerce.productName();
      record.imgDimensions = [{ height: 480, width: 640 }, { height: 480, width: 640 }, { height: 480, width: 640 }]
      record.imgURLs = [faker.random.image(), faker.random.image(), faker.random.image()]
      record.totalImages = 3;
      all.push(record);
    }

    await db.bigBatch(all)
      .then((result) => console.log('donezo', result, new Date))
      .catch((fail) => console.log('enjoy the fail', fail))

  }
})()
console.log('All done!', new Date)
// console.log('Starting to Seed');
// db.bigBatch(all)
//   .then((result) => console.log('donezo', result))
//   .catch((fail) => console.log('enjoy the fail', fail))