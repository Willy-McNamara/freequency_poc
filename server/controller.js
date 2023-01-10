const MP3Cutter = require('mp3-cutter');
const Models = require('./model/Model');

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
    return new Models.Chunk({
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
    // save the song name and date
     return [dbEntries, new Models.Song({
      songName: chunks[0].chunkParent,
      dateAdded: new Date().toString()
    }).save()]
  })
  .then((arr) => {
    // send the new entries back to the client as array of obj
    console.log('res from db adding song name', arr[1])
    res.send(arr[0])
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