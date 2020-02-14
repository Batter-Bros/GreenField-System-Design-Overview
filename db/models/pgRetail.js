const Pool = require("pg").Pool;
const schemaName = "product";
const postgresRole = "";
var pgSchemas = [];

const pool = new Pool({
  user: postgresRole,
  host: "localhost",
  database: "pgproducts",
  password: "1234",
  port: "3000"
});

const schemaCodes = {
  "25007": "schema_and_data_statement_mixing_not_supported",
  "3F000": "invalid_schema_name",
  "42P06": "duplicate_schema",
  "42P15": "invalid_schema_definition",
  "42000": "syntax_error_or_access_rule_violation",
  "42601": "syntax_error"
};

async function schemaFuncs() {
  let selectSchemasSql = "SELECT schema_name FROM information_schema.schemata;";
  await pool.query(selectSchemasSql, (err, res) => {
    console.log("selectSchemasSql:", selectSchemasSql);

    if (err) {
      console.log("SELECT schema_name:", schemaCodes[err.code]);
      console.log("ERROR code:", err.code);
    } else if (res.rows !== undefined) {
      res.rows.forEach(row => {
        pgSchemas.push(row.schema_name);
      });
      console.log("schema names:", pgSchemas);
      console.log("SELECT schema_name total schemas:", res.rowCount);
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
      console.log("CREATE SCHEMA RESULT:", createRes.command);

      let createProdTable = `CREATE TABLE ${schemaName}.prod(
        id INT PRIMARY KEY,
        product_name VARCHAR,
        slogan VARCHAR,
        product_description VARCHAR,
        category VARCHAR,
        default_price VARCHAR,
        feature VARCHAR,
        val VARCHAR
      );`;

      let createStyleTable = `CREATE TABLE ${schemaName}.style(
        product_id INT REFERENCES prod PRIMARY KEY,
        style_id INT PRIMARY KEY,
        product_name VARCHAR,
        sale_price VARCHAR,
        default VARCHAR,
        );`;

      let createSkusTable = `CREATE TABLE ${schemaName}.skus(
        id INT PRIMARY KEY
        STYLE_ID REFERENCES style PRIMARY KEY
        x INT,
        xs INT,
        m INT,
        l INT,
        xl INT,
        xxl INT
      )`
      let createPhotoTable = `CREATE TABLE ${schemaName}.photo(
        ID INT PRIMARY KEY
        STYLE_ID INT REFERENCES style PRIMARY KEY
        thumbnail_url TEXT,
        photo_url TEXT,
      )`

      console.log("createProdTable:", createProdTable);
      console.log("createStyleTable:", createStyleTable);
      console.log("createStyleTable:", createPhotoTable);

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
          console.log("CREATE TABLE RESULT:", tableRes);
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
          console.log("CREATE TABLE RESULT:", tableRes);
        }
      });
    }
  });
}

schemaFuncs();