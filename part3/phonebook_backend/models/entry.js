const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
require("dotenv").config();

const url = process.env.MONGODB_URI;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const entrySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    minLength: 4,
    unique: true,
  },
  number: {
    type: String,
    required: true,
    minLength: 8,
  },
});
entrySchema.plugin(uniqueValidator);
const Entry = new mongoose.model("Entry", entrySchema);

module.exports = Entry;
