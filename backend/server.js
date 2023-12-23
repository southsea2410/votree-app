const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

if (process.env.NODE_ENV === 'development') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`App running on port ${port}`);
  });
}
else{
  const { setGlobalOptions } = require("firebase-functions/v2/options");
  setGlobalOptions({maxInstances: 10});
  const {onRequest} = require("firebase-functions/v2/https");
  exports.app = onRequest(app);
}