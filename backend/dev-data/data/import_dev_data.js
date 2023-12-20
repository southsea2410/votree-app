const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./../../models/userModel');
const Seller = require('./../../models/sellerModel');
const Product = require('./../../models/productModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'));

// READ JSON FILE
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/users-test.json`, 'utf-8'),
);
// const sellers = JSON.parse(
//   fs.readFileSync(`${__dirname}/sellers-test.json`, 'utf-8'),
// );
// const products = JSON.parse(
//   fs.readFileSync(`${__dirname}/products-test.json`, 'utf-8'),
// );

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await User.create(users, { validateBeforeSave: false });
    // await Seller.create(sellers, { validateBeforeSave: false });
    // await Product.create(products, { validateBeforeSave: false });

    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await User.deleteMany();
    // await Seller.deleteMany();
    // await Product.deleteMany();

    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
