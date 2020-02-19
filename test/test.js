const request = require('supertest');
const app = require('../server/index')
// const dotenv = require('dotenv').config()

describe('Test the test path', () => {

  afterAll(async (done) => {
    setImmediate(done);
  });

  test('it should respond to the GET method', () => {
    return request(app).get('/test')
      .expect(200)
      .then(res => {
        expect(res.text).toBe('Successfully connected!')
      })
    })
  })


describe('Test database connectivity', () => {

  afterAll(async (done) => {
    setImmediate(done);
  });

  test('it should return data from the database', () => {
    return request(app).get('/products/list')
      .expect(200)
      .then(res => {
        let products = JSON.parse(res.text);
        expect(products[0]).toHaveProperty('id')
        expect(products[1]).toHaveProperty('name')

      });
  })
})