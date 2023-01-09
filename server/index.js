const path = require('path');
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
// multer is a package that allows your express server to recieve multipart form-data (in this case, our mp3s!)
const multer  = require('multer')
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
})
const upload = multer({ storage })

let app = express()
app.use(cors())
app.use(express.static(path.join('../public')));

const PORT = process.env.PORT || 3055;

// post route which captures mp3's sent over from the client
app.post('/upload', upload.single('mp3'), (req, res) => {
  console.log('here is file:', req.file)
  res.send('successful send!')
})

app.listen(PORT, () => {
  console.log(`Web server running on: http://localhost:${PORT}`);
});