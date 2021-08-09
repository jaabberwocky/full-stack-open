const mongoose = require("mongoose");
require('dotenv').config();

const url = process.env.MONGODB_URI;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const entrySchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
});

const Entry = new mongoose.model("Entry", entrySchema);

// if (process.argv.length < 3) {
//   // print all entries
//   console.log("phonebook:");
//   Entry.find({}).then((res) => {
//     res.forEach((entry) => console.log(`${entry.name} ${entry.number}`));
//     mongoose.connection.close();
//   });
// } else {
//   const name = process.argv[3];
//   const number = process.argv[4];

//   const entry = new Entry({
//     name: name,
//     number: number,
//   });
//   entry.save().then((res) => {
//     console.log(`Entry ${name} saved!`);
//     mongoose.connection.close();
//   });
// }

module.exports = Entry;