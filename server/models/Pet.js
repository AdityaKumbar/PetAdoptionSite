const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: String,
  type: String,
  age: String,
  area: String,
  justification: String,
  email: String,
  phone: String,
  picture: String,
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;