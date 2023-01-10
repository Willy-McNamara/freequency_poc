const mongoose = require('mongoose');

const chunkSchema = new mongoose.Schema({
  chunkParent: String,
  chunkName: String,
  chunkNotes: String,
  chunkPath: String,
  chunkStart: Number,
  chunkEnd: Number
});

const Chunk = mongoose.model('Chunk', chunkSchema);

module.exports = Chunk;