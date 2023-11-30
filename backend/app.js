const express = require('express');
const morgan = require('morgan');

const app = express();

const product = require('./routes/productRoutes');

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/products', product);

// 4. Start Server
module.exports = app;
