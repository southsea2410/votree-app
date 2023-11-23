const express = require('express');
const morgan = require('morgan');

const app = express();

// 1. Middleware
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

// app.use('/api/v1/users', userRouter);
// app.use('/api/v1/tours', tourRouter);

// 4. Start Server
module.exports = app;
