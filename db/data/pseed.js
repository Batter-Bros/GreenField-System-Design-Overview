const pgp = require('pg-promise')();
const seedData = require('./pseedData');

const photoSize = 10000000;
const featureSize = 1000000;
const productSize = 100000000;

const time = new Date().getTime();

const db = pgp({
  database: 'postgres',
  port: 5432,
});

const dbt = pgp({
  database: 'pgproducts',
  port: 5432,
});

const insertPhoto = (init) => {
  const bcs = new pgp.helpers.ColumnSet(
    ['id', 'url', 'thumbnail_url'],
    { table: 'photo' },
  );

  const bquery = pgp.helpers.insert(seedData.createBulkFeature(init), bcs);

  return dbt.none(bquery)
    .then((data) => {
    })
    .catch((error) => {
      console.log(error);
    });
};

const insertFeature = (init) => {
  const ucs = new pgp.helpers.ColumnSet(
    ['id', 'feature', 'value'],
    { table: 'features' },
  );

  const uquery = pgp.helpers.insert(seedData.createBulkPhoto(init), ucs);

  return dbt.none(uquery)
    .then((data) => {
      // console.log('user list success');
    })
    .catch((error) => {
      console.log('error');
    });
};

const insertProduct = (init) => {
  const pcs = new pgp.helpers.ColumnSet(
    ['id', 'name', 'product_id', 'slogan', 'description', 'category', 'default_price','name', 'original_price', 'sale_price', 'default'],
    { table: 'products' },
  );

  const pquery = pgp.helpers.insert(seedData.createBulkProduct(init), pcs);

  return dbt.none(pquery)
    .then((data) => {
    })
    .catch((err) => {
      console.log(err);
    });
};

const createPhotoTB = () => {
  return dbt.none('CREATE TABLE photo(' +
  'id INTEGER UNIQUE,' +
  'url,' +
  'thumbnail_url TEXT);')
    .then((data) => {
      console.log('created photo table');
    })
    .then(async () => {
      for (let i = 0; i < photoSize; i += 1000) {
        await insertPhoto(i);
      }
      console.log(`photo time: ${(new Date().getTime() - time) / 1000}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

const createFeatureTB = () => {
  return dbt.none('CREATE TABLE features(' +
  'id INTEGER UNIQUE,' +
  'feature TEXT,' +
  'value TEXT);')
    .then((data) => {
      console.log('created features');
    })
    .then(async () => {
      for (let j = 0; j < featureSize; j += 1000) {
        await insertFeature(j);
      }
      console.log(`feature time: ${(new Date().getTime() - time) / 1000}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

const createProductTB = () => {
  return dbt.none('CREATE TABLE products(' +
  'id INTEGER UNIQUE,' +
  'name TEXT,' +
  'product_id TEXT,' +
  'slogan TEXT,' +
  'description TEXT,' +
  'category TEXT' +
  'default_price TEXT' +
  'style_id TEXT' +
  'original_price TEXT' +
  'sale_price TEXT' +
  'default INTEGER);')
    .then((data) => {
      console.log('created products');
    })
    .then(async () => {
      for (let  k = 0; k < productSize; k += 1000) {
        await insertProduct(k);
      }
      console.log(`product time: ${(new Date().getTime() - time) / 1000}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

const createFK = () => {
  return dbt.none('ALTER TABLE products ADD FOREIGN KEY ("photo_id") REFERENCES photos("id"),' +
  'ADD FOREIGN KEY ("feature_id") REFERENCES features("id");')
    .then(() => {
      console.log(`fk time: ${(new Date().getTime() - time) / 1000}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

const indexProductsDB = () => {
  return dbt.none('CREATE INDEX CONCURRENTLY ON products("id");')
    .then(() => {
      console.log(`index product time: ${(new Date().getTime() - time) / 1000}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

const indexFeaturesDB = () => {
  return dbt.none('CREATE INDEX CONCURRENTLY ON features("id");')
    .then(() => {
      console.log(`index feature time: ${(new Date().getTime() - time) / 1000}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

const indexPhotoDB = () => {
  return dbt.none('CREATE INDEX CONCURRENTLY ON photos ("id");')
    .then(() => {
      console.log(`index photo time: ${(new Date().getTime() - time) / 1000}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

// const indexPhotosFKUserDB = () => {
//   return dbt.none('CREATE INDEX CONCURRENTLY ON photos("user_id");')
//     .then(() => {
//       console.log(`index photo fk user time: ${(new Date().getTime() - time) / 1000}`);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

// const indexPhotosFKBizDB = () => {
//   return dbt.none('CREATE INDEX CONCURRENTLY ON photos("business_id");')
//     .then(() => {
//       console.log(`index photo fk biz time: ${(new Date().getTime() - time) / 1000}`);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

const createDB = () => {
  db.none('CREATE DATABASE commerce')
    .then((data) => {
      console.log('created commerce db');
    })
    .then(async () => {
      createPhotoTB();
      createFeatureTB();
      await createProductTB();
    })
    .then(async () => {
      await createFK();
    })
    .then(async () => {
      await indexPhotoDB();
      await indexFeaturesDB();
      await indexProductsDB();
      await indexPhotosFKBizDB();
      await indexPhotosFKUserDB();
    })
    // .then(async () => {
    //   await createProductTB();
    // })
    .catch((err) => {
      console.log(err);
    });
};

createDB();
