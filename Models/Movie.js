const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  mname: String,
  actor: String,
  actress: String,
  director: String,
  releasedYear:String, // Update the field name to "releasedYear"
  camera: String,
  producer: String,
  language: String,
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
