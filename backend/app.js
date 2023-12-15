require('express-async-errors');
const express = require('express');
const morgan = require('morgan');

const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

const app = express();

const productRouter = require('./routes/productRoutes');
const sellerRouter = require('./routes/sellerRoutes');
const cartRouter = require('./routes/cartRoutes');
const orderRouter = require('./routes/orderRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

// routers
const authRouter = require('./routes/auth');
const updateInfoRouter = require('./routes/updateInfo');
const updatepwRouter = require('./routes/updatepw');
const otpRouter = require('./routes/otp');
const forgotpwRouter = require('./routes/forgotpw');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Set security HTTP headers
app.use(helmet());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(fileUpload());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

app.use(express.static(`${__dirname}/../dist`));

// Data sanitization against XSS
app.use(xss());

app.use('/api/v1/marketplace/products', productRouter);
app.use('/api/v1/sellers', sellerRouter);
app.use('/api/v1/marketplace/carts', cartRouter);
app.use('/api/v1/marketplace/orders', orderRouter);
app.use('/api/v1/reviews', reviewRouter);

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/otp', otpRouter);
app.use('/api/v1/forgotpw', forgotpwRouter);

// routes after login
app.use('/api/v1/updateInfo', updateInfoRouter);
app.use('/api/v1/updatepw', updatepwRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// 4. Start Server
module.exports = app;
