const path = require('path');
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const db = require('./model/index.js');
const controller = require('./controller.js');
const Models = require('./model/Model');

/* ======== ======== ======== MULTER ======== ======== ======== */
/* a special middleware for recieving multipart form-data (in this case, our mp3s!) */

const multer  = require('multer')
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
})
const upload = multer({ storage })


/* ======== ======== ======== MIDDLEWARE ======== ======== ======== */
let app = express()
app.use(cors())
app.use(express.json());
app.use(express.static(path.join('../public')));

/* ======== ======== ======== ROUTES ======== ======== ======== */

// POST MP3
app.post('/upload/mp3', upload.single('mp3'), (req, res) => {
  res.send('file recieved')
})
// POST CHUNK INFO
app.post('/upload/chunkInfo', (req, res) => {
  console.log('here is req.body:', req.body)
  // send to a controller which will chop up and save new mini mp3s, and add info to db
  controller.chunker(req, res)
})
// POST SESSION NOTES
app.post('/notes', (req,res) => {
  console.log('notes route working, here is req.body :', req.body)
  controller.notePoster(req,res)
})

// GET ALL SONGS
app.get('/songs', (req, res) => {
  controller.songsRetriever(req, res)
})
// GET CHUNKS FROM SPECIFIC SONG
app.get('/chunks/:songName', (req, res) => {
  console.log('logging req.params in get chunks', req.params)
  controller.chunkRetriever(req, res)
})
// GET MP3 FOR SPECIFIC CHUNK
app.get('/chunk/:chunkName', (req, res) => {
  res.sendFile(__dirname + `/uploads/chunks/${req.params.chunkName}`)
})
// GET PRACTICE LOG
app.get('/practiceLog/:songName', (req, res) => {
  console.log('logging req.params in get practice log', req.params)
  controller.practiceLogRetriever(req, res)
})

/* ======== ======== ======== SET TO LISTEN ======== ======== ======== */

const PORT = process.env.PORT || 3055;
app.listen(PORT, () => {
  console.log(`Web server running on: http://localhost:${PORT}`);
});