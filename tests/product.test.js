const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const http = require('http');
const app = require('../src/app');
const Product = require('../src/models/productModel');

const server = http.createServer(app);
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Product.deleteMany();
});

describe('Product API', () => {

  // POST
  it('should create a new product', async () => {
    const product = {
      name: 'Test Product',
      price: 99.99,
      category: 'Test',
      inStock: true
    };

    const res = await request(server)
      .post('/api/v1/products')
      .send(product)
      .expect(201);

    expect(res.body.status).toBe('success');
    expect(res.body.data.product.name).toBe(product.name);
    expect(res.body.data.product.price).toBe(product.price);
  });

  it('should return 400 if required fields are missing', async () => {
    const res = await request(server)
      .post('/api/v1/products')
      .send({})
      .expect(400);

    expect(res.body.status).toBe('fail');
    expect(res.body.message).toBeDefined();
  });

  // GET
  it('should return all products', async () => {
    await Product.create({ name: 'Product 1', price: 10, category: 'Cat1', inStock: true });
    await Product.create({ name: 'Product 2', price: 20, category: 'Cat2', inStock: false });

    const res = await request(server)
      .get('/api/v1/products')
      .expect(200);

    expect(res.body.status).toBe('success');
    expect(res.body.results).toBe(2);
    expect(res.body.data.products.length).toBe(2); // ← ajuste aqui
  });


    // GET by ID
  it('should return a single product by ID', async () => {
    const product = await Product.create({
      name: 'Unique Product',
      price: 49.99,
      category: 'UniqueCat',
      inStock: true
    });

    const res = await request(server)
      .get(`/api/v1/products/${product._id}`)
      .expect(200);

    expect(res.body.status).toBe('success');
    expect(res.body.data.product.name).toBe('Unique Product');
    expect(res.body.data.product.price).toBe(49.99);
  });


  // PUT
  it('should update a product', async () => {
    const product = await Product.create({ name: 'Old Name', price: 15, category: 'OldCat', inStock: true });

    const res = await request(server)
      .put(`/api/v1/products/${product._id}`)
      .send({ name: 'New Name' })
      .expect(200);

    expect(res.body.status).toBe('success');
    expect(res.body.data.product.name).toBe('New Name');
  });

  // DELETE
  it('should delete a product', async () => {
    const product = await Product.create({ name: 'To Delete', price: 30, category: 'DelCat', inStock: true });

    await request(server)
      .delete(`/api/v1/products/${product._id}`)
      .expect(204);

    const found = await Product.findById(product._id);
    expect(found).toBeNull();
  });

});
