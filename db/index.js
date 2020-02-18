const fs = require("fs");
const mongodb = require("mongodb").MongoClient;
const fastcsv = require("fast-csv");

let url = "mongodb://localhost:27017/";
let stream = fs.createReadStream("product.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push({
      id: data[0],
      name: data[1],
      slogan: data[2],
      description: data[3],
      category: data[4],
      default_price: data[5],
      // features: [featuresSchema],
      // skus: skusSchema,
      // style: styleSchema
    });
  })
  .on("end", function() {
    csvData.shift();

    console.log(csvData);

    mongodb.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        if (err) throw err;

        client
          .db("products")
          .collection("product")
          .insertMany(csvData, (err, res) => {
            if (err) throw err;

            console.log(`Inserted: ${res.insertedCount} rows`);
            client.close();
          });
      }
    );
  });

stream.pipe(csvStream);