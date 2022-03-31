const mongoose = require('mongoose');
const { DB_URL } = require('../config');



console.log(`DB_URL`, DB_URL);

module.exports = () => {
  console.log('connecting to DB...');
  mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`DB connection successful!`))
    .catch((err) => {
      console.log('DB Connection Failed !');
      console.log(`err`, err);
    });
};