const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UrlSchema = new Schema({
  value: { type: String, required: true }
});

module.exports = mongoose.model('Url', UrlSchema);
