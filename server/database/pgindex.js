const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'productMain',
  password: 'postgres'
})

const getSome = () => {
  return pool.query('SELECT * FROM products LIMIT 100')
    .then(res => res.rows)
    .catch(e => console.error(e.stack))
}

const get = (asin)  => {
  console.log(asin)
  return pool.query(`SELECT * FROM products WHERE asin = '${asin}'`)
    .then(res => res.rows[0])
    .catch(e => console.error(e.stack))
}

const add = (product) => {
  return pool.query(`INSERT INTO public.products(asin, "productTitle", "bulletPoints", price, "totalImages", "imgURLs", "imgDimensions")
  VALUES ('${product.asin}', '${product.productTitle}', '{${product.bulletPoints[0]},${product.bulletPoints[1]}, ${product.bulletPoints[2]}}', ${product.price}, ${product.totalImages}, '{${product.imgURLs[0]},${product.imgURLs[1]},${product.imgURLs[2]}}', array['${JSON.stringify(product.imgDimensions[0])}','${JSON.stringify(product.imgDimensions[1])}','${JSON.stringify(product.imgDimensions[2])}']::json[]);`)
    .then(res => res)
    .catch(e => console.log('Error inserting:', e))
}

module.exports = { getSome, add, get }