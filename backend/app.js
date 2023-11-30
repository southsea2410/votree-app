const express = require('express');
const morgan = require('morgan');

const app = express();

const productRouter = require('./routes/productRoutes');
const sellerRouter = require('./routes/sellerRoutes');

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/products', productRouter);
app.use('/api/v1/sellers', sellerRouter);

// 4. Start Server
module.exports = app;
