const Pool = require("pg").Pool;


const schemaName = "products";
const postgresRole = "postgres";
var pgSchemas = [];

const pool = new Pool({
  user: postgresRole,
  host: "localhost",
  database: "pgproducts",
  password: "postgres",
  port: "5432"
});

const schemaCodes = {
  "25007": "schema_and_data_statement_mixing_not_supported",
  "3F000": "invalid_products",
  "42P06": "duplicate_schema",
  "42P15": "invalid_schema_definition",
  "42000": "syntax_error_or_access_rule_violation",
  "42601": "syntax_error"
};

async function schemaFuncs() {
  let selectSchemasSql = "SELECT * FROM pgproducts.schemata;";
  await pool.query(selectSchemasSql, (err, res) => {
    console.log("\nselectSchemasSql:", selectSchemasSql);

    if (err) {
      console.log("SELECT products:", schemaCodes[err.code]);
      console.log("ERROR code:", err.code);
    } else if (res.rows !== undefined) {
      res.rows.forEach(row => {
        pgSchemas.push(row.products);
      });
      console.log("schema names:", pgSchemas);
      console.log("SELECT products total schemas:", res.rowCount);
    }
  });

  let createSql = `CREATE SCHEMA IF NOT EXISTS
${schemaName} AUTHORIZATION ${postgresRole};`;

  console.log("createSql:", createSql);
  await pool.query(createSql, (createErr, createRes) => {
    if (createErr) {
      console.log(
        "CREATE SCHEMA ERROR:",
        createErr.code,
        "--",
        schemaCodes[createErr.code]
      );
      console.log("ERROR code:", createErr.code);
      console.log("ERROR detail:", createErr.detail);
    }

    if (createRes) {
      console.log("\nCREATE SCHEMA RESULT:", createRes.command);

      let createProdTable = `CREATE TABLE ${schemaName}.prod(
        id INT PRIMARY KEY,
        product_name VARCHAR,
        slogan VARCHAR,
        product_description VARCHAR,
        category VARCHAR,
        default_price VARCHAR,
      );`;

      let createStyleTable = `CREATE TABLE ${schemaName}.style(
        product_id INT REFERENCES prod PRIMARY KEY,
        style_id INT PRIMARY KEY,
        product_name VARCHAR,
        sale_price VARCHAR,
        default VARCHAR,
        );`;

      let createSkusTable = `CREATE TABLE ${schemaName}.skus(
        id INT PRIMARY KEY,
        style_id REFERENCES style PRIMARY KEY,
        x INT,
        xs INT,
        m INT,
        l INT,
        xl INT,
        xxl INT
      )`

      let createFeaturesTable = `CREATE TABLE ${schemaName}.features(
        id INT PRIMARY KEY,
        style_id REFERENCES style PRIMARY KEY,
        feature VARCHAR,
        value VARCHAR
      )`
      let createPhotoTable = `CREATE TABLE ${schemaName}.photo(
        ID INT PRIMARY KEY,
        style_id INT REFERENCES style PRIMARY KEY,
        thumbnail_url VARCHAR,
        photo_url VARCHAR,
      )`

      console.log("\ncreateProdTable:", createProdTable);
      console.log("\ncreateStyleTable:", createStyleTable);
      console.log("\ncreateSkusTable:", createSkusTable);
      console.log("\ncreateFeaturesTable:", createFeaturesTable);
      console.log("\ncreatePhotosTable:", createPhotoTable);

      pool.query(createProdTable, (tableErr, tableRes) => {
        if (tableErr) {
          console.log(
            "CREATE TABLE ERROR:",
            tableErr.code,
            "--",
            schemaCodes[tableErr.code]
          );
          console.log("createProdTable:", tableErr);
        }

        if (tableRes) {
          console.log("\nCREATE TABLE RESULT:", tableRes);
        }
      });
      pool.query(createStyleTable, (tableErr, tableRes) => {
        if (tableErr) {
          console.log(
            "CREATE TABLE ERROR:",
            tableErr.code,
            "--",
            schemaCodes[tableErr.code]
          );
          console.log("createStyleTable:", tableErr);
        }

        if (tableRes) {
          console.log("\nCREATE TABLE RESULT:", tableRes);
        }
      });
      pool.query(createSkusTable, (tableErr, tableRes) => {
        if (tableErr) {
          console.log(
            "CREATE TABLE ERROR:",
            tableErr.code,
            "--",
            schemaCodes[tableErr.code]
          );
          console.log("createSkusTable:", tableErr);
        }

        if (tableRes) {
          console.log("\nCREATE TABLE RESULT:", tableRes);
        }
      });
      pool.query(createFeaturesTable, (tableErr, tableRes) => {
        if (tableErr) {
          console.log(
            "CREATE TABLE ERROR:",
            tableErr.code,
            "--",
            schemaCodes[tableErr.code]
          );
          console.log("createFeaturesTable:", tableErr);
        }

        if (tableRes) {
          console.log("\nCREATE TABLE RESULT:", tableRes);
        }
      });
      pool.query(createPhotosTable, (tableErr, tableRes) => {
        if (tableErr) {
          console.log(
            "CREATE TABLE ERROR:",
            tableErr.code,
            "--",
            schemaCodes[tableErr.code]
          );
          console.log("createPhotosTable:", tableErr);
        }

        if (tableRes) {
          console.log("\nCREATE TABLE RESULT:", tableRes);
        }
      });
    }
  });
}

schemaFuncs();



const getSome = () => {
  return pool.query('SELECT * FROM prod LIMIT 100')
    .then(res => res.rows)
    .catch(e => console.error(e.stack))
}

const get = (id)  => {
  console.log(id)
  return pool.query(`SELECT * FROM prod WHERE id = '${id}'`)
    .then(res => res.rows[0])
    .catch(e => console.error(e.stack))
}

const add = (product) => {
  return pool.query(`INSERT INTO pgproducts.prod(, "product_name", "slogan", "product_description", "category", "default_price")
  VALUES (${product.id}, ${product.product_name}, ${product.slogan}, ${product.product_description}, ${product.category}, ${product.default_price});`
    .then(res => res)
    .catch(e => console.log('Error inserting:', e))
  )}

module.exports = { getSome, add, get }

// , array['${JSON.stringify(product.imgDimensions[0])}','${JSON.stringify(product.imgDimensions[1])}','${JSON.stringify(product.imgDimensions[2])}']::json[]);`