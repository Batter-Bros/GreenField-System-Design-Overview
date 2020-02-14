const pgp = require('pg-promise')();

const dbt = pgp({
  database: 'pgproducts',
  port: 5432,
});

function findOne(id, callback) {
  // console.log('database finding by id:', id);
  dbt.any(`SELECT * from features INNER JOIN photos ON features.id = products.features_id INNER JOIN photos on products.photo_id = products.id WHERE features.id = ${id};`, [true])
    .then(function(data) {
      // console.log(data);
      callback(data);
    })
    .catch(function(error) {
      console.log(error);
    });
}

module.exports.findOne = findOne;
