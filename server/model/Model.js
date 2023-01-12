const mongoose = require('mongoose');

const chunkSchema = new mongoose.Schema({
  chunkParent: String,
  chunkName: String,
  chunkNotes: String,
  chunkPath: String,
  chunkStart: Number,
  chunkEnd: Number
});

const songSchema = new mongoose.Schema({
  songName: String,
  dateAdded: String,
  totalDuration: {type: Number, default: 0}
});

const notesSchema = new mongoose.Schema({
  songName: String,
  date: String,
  duration: Number,
  notes: String
});

const recordingsSchema = new mongoose.Schema({
  songName: String,
  title: String
});

const Chunk = mongoose.model('Chunk', chunkSchema);
const Song = mongoose.model('Song', songSchema);
const Notes = mongoose.model('Notes', notesSchema);
const Recording = mongoose.model('Recording', recordingsSchema);

module.exports = {Chunk, Song, Notes, Recording};