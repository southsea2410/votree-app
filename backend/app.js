const express = require('express');
const morgan = require('morgan');
const app = express();

const productRouter = require('./routes/productRoutes');
const sellerRouter = require('./routes/sellerRoutes');
const cartRouter = require('./routes/cartRoutes');
const orderRouter = require('./routes/orderRoutes');
const reviewRouter = require('./routes/reviewRoutes');

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/marketplace/products', productRouter);
app.use('/api/v1/sellers', sellerRouter);
app.use('/api/v1/marketplace/carts', cartRouter);
app.use('/api/v1/marketplace/orders', orderRouter);
app.use('/api/v1/reviews', reviewRouter);

// 4. Start Server
module.exports = app;
