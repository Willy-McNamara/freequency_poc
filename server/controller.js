// here i will recieve the upload packet, chop up the mp3, and coordinate saving the correct path
// and additional information in my database

const MP3Cutter = require('mp3-cutter');

const chunker = (req, res) => {
  let chunks = req.body
  // loop over chunks (res.body, its an array of objects)
  // perform the cut function on each
  chunks.forEach((chunk) => {
    MP3Cutter.cut({
      src: './uploads/' + chunk.chunkParent,
      target: `./uploads/chunks/${chunk.chunkName}.mp3`,
      start: Number(chunk.chunkStart),
      end: Number(chunk.chunkEnd)
  });
  })
}

module.exports = chunker
// do my mp3 splitting shenanigans