const path = require('path');
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const chunker = require('./controller.js')
// multer is a package that allows your express server to recieve multipart form-data (in this case, our mp3s!)
const multer  = require('multer')
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
  destination: function (req, file, cb) {
    cb(null, '../public')
  },
})
const upload = multer({ storage })

let app = express()
app.use(cors())
app.use(express.json());
app.use(express.static(path.join('../public')));

const PORT = process.env.PORT || 3055;

// post route which captures mp3's sent over from the client
app.post('/upload/mp3', upload.single('mp3'), (req, res) => {
  console.log('here is file:', req.file)
  res.send('file recieved')
})

app.post('/upload/chunkInfo', (req, res) => {
  console.log('here is req.body:', req.body)
  // send to a controller which will chop up and save new mini mp3s
  chunker(req, res)
  res.send('file recieved')
})

app.get('/chunk/:chunkName', (req, res) => {
  console.log('request recieved for chunk, here is body.params', req.params)
  res.sendFile(__dirname + '/uploads/DonnaLee.mp3')
})

app.listen(PORT, () => {
  console.log(`Web server running on: http://localhost:${PORT}`);
});