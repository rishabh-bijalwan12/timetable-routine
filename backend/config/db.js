const mongoose = require('mongoose');
require('dotenv').config();

const dbUrl = process.env.MONGO_DB_URL;

const db = mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("DB Connected");
}).catch((err) => {
  console.error("DB Not Connected:", err);
});
