const fs = require("fs");
const mongodb = require("mongodb").MongoClient;
const fastcsv = require("fast-csv");
const csv = require('csv-writer')

let url = "mongodb://localhost:27017/products";
let stream = fs.createReadStream("product.csv");
let streamFeatures = fs.createReadStream("features.csv");
let streamSkus = fs.createReadStream("skus.csv");
let streamStyles = fs.createReadStream("styles.csv");
let streamPhotos = fs.createReadStream("photos.csv");
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
//----------------------------------------------------------------

// fs.createReadStream(filepath)
//     .on('error', () => {
//         // handle error
//     })

//     .pipe(csv())
//     .on('data', (data) => {
//       for(var i = 0; i < csvData.length; i++){
//         if(data[i][1] === csvData[i][0]) {
//           csvData[i].push(data[i])
//         }
//       }
//     })

//     .on('end', () => {
//         // handle end of CSV
//     })