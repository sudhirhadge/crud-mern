const mongoose = require('mongoose');
const Product = require('./models/Product');
const dotenv = require('dotenv');

/*
server.js
Purpose: This is your main server file. It sets up your Express application, connects to MongoDB, configures middleware, and defines your routes.
Usage: This file is necessary for running your server and handling requests from the frontend.
seed.js
Purpose: This file is used to seed your database with initial data. In this case, it populates your MongoDB database with the initial 10 products.
Usage: You only need to run this file once (or whenever you want to reset/repopulate your database with the initial data).
*/

dotenv.config();

const products = [
  { name: 'Product 1', price: 100, discountedPrice: 90, image: 'image1.jpg' },
  { name: 'Product 2', price: 200, discountedPrice: 180, image: 'image2.jpg' },
  { name: 'Product 3', price: 300, discountedPrice: 270, image: 'image3.jpg' },
  { name: 'Product 4', price: 400, discountedPrice: 360, image: 'image4.jpg' },
  { name: 'Product 5', price: 500, discountedPrice: 450, image: 'image5.jpg' },
  { name: 'Product 6', price: 600, discountedPrice: 540, image: 'image6.jpg' },
  { name: 'Product 7', price: 700, discountedPrice: 630, image: 'image7.jpg' },
  { name: 'Product 8', price: 800, discountedPrice: 720, image: 'image8.jpg' },
  { name: 'Product 9', price: 900, discountedPrice: 810, image: 'image9.jpg' },
  { name: 'Product 10', price: 1000, discountedPrice: 900, image: 'image10.jpg' },
];

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log('MongoDB connected');
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Products seeded');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    mongoose.disconnect();
  });
