// const mongoose = require('mongoose');
const User = require('./models/userModel');
const Seller = require('./models/sellerModel');
const Product = require('./models/productModel');

const fs = require('fs');
const path = require('path');

const generateData = require('./dev-data/generate-data/generate-data-functions');

// const users = Array.from(
//   { length: 10 },
//   () => new User(generateData.generateUserData()),
// );

const sellers = Array.from(
  { length: 10 },
  () => new Seller(generateData.generateSellerData()),
);

const products = Array.from(
  { length: 10 },
  () => new Product(generateData.generateProductData()),
);

const sellersData = JSON.stringify(sellers);
const sellersDataPath = path.join(__dirname, 'dev-data/data/sellers-test.json');

const productsData = JSON.stringify(products);
const productsDataPath = path.join(
  __dirname,
  'dev-data/data/products-test.json',
);

// const usersData = JSON.stringify(users);
// const usersDataPath = path.join(__dirname, 'dev-data/data/users-test.json');

// fs.writeFile(usersDataPath, usersData, (err) => {
//   if (err) throw err;
//   console.log('Users data written to file');
// });

fs.writeFile(sellersDataPath, sellersData, (err) => {
  if (err) throw err;
  console.log('Sellers data written to file');
});

fs.writeFile(productsDataPath, productsData, (err) => {
  if (err) throw err;
  console.log('Products data written to file');
});
