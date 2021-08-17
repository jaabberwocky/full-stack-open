require('dotenv').config()

const mongoUrl = process.env.MONGO_DB_URI;
const PORT = process.env.PORT;

module.exports = {
  mongoUrl,
  PORT,
};
