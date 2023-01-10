const MP3Cutter = require('mp3-cutter');
const Chunk = require('./model/Chunk');

const chunker = (req, res) => {
  let chunks = req.body
  // loop over chunks (res.body, its an array of objects)
  // perform the cut function on each
  let dbEntries = chunks.map((chunk) => {
    console.log('logging chunk in controller', chunk)
    MP3Cutter.cut({
      src: './uploads/' + chunk.chunkParent,
      target: `./uploads/chunks/${chunk.chunkName.replace(/\s/g, '')}.mp3`,
      start: Number(chunk.chunkStart),
      end: Number(chunk.chunkEnd)
    });
    return new Chunk({
      chunkParent: chunk.chunkParent,
      chunkName: chunk.chunkName,
      chunkNotes: chunk.chunkNotes,
      chunkPath: `./uploads/chunks/${chunk.chunkName.replace(/\s/g, '')}.mp3`,
      chunkStart: Number(chunk.chunkStart),
      chunkEnd: Number(chunk.chunkEnd)
    }).save()
    .then((dbRes) => {
      console.log('here is dbRes in controller', dbRes) // logs object from db
      return dbRes;
    })
  })
  Promise.all(dbEntries)
  .then((dbEntries) => {
    // here are the db entries which should be an array of objects, can send these back to the client I believe!
    console.log('logging dbEntries in Promise.all() controller', dbEntries)
    res.send(dbEntries)
  })
  .catch((err) => {
    console.log('error in promise chain in controller, here is err', err)
    res.send(err)
  })
}

module.exports = chunker

/*
.then((dbRes) => {
      console.log('here is dbRes in controller', dbRes) // logs object from db
      return dbRes;
    })
*/