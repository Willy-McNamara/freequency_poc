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
      target: `./uploads/chunks/${chunk.chunkParent + chunk.chunkName.replace(/\s/g, '')}.mp3`,
      start: Number(chunk.chunkStart),
      end: Number(chunk.chunkEnd)
    });
    return new Models.Chunk({
      chunkParent: chunk.chunkParent,
      chunkName: chunk.chunkName,
      chunkNotes: chunk.chunkNotes,
      chunkPath: `${chunk.chunkParent + chunk.chunkName.replace(/\s/g, '')}.mp3`,
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
    res.send(dbEntries)
     return Models.Song.find({songName: chunks[0].chunkParent})
  })
  .then((dbRes) => {
    console.log('logging dbRes from searching for Song already in db :', dbRes)
    // send the new entries back to the client as array of obj
    if (dbRes.length !== 0) {
      return
    } else {
      return (new Models.Song({
        songName: chunks[0].chunkParent,
        dateAdded: new Date().toString()
      }).save())
    }
  })
  .then((dbRes) => {
    console.log('new song added! here is dbRes', dbRes)
  })
  .catch((err) => {
    console.log('error in promise chain in controller, here is err', err)
    res.send(err)
  })
}

const chunkRetriever = (req, res) => {
  // use songName in req.params to retrieve all chunks from database matching that chunkParent
  Models.Chunk.find({chunkParent: req.params.songName})
  .then((dbRes) => {
    res.send(dbRes)
  })
  .catch((err) => {
    console.log('error in chunkRetriever, controller.js', err)
    res.send(err)
  })
}

const songsRetriever = (req, res) => {
  Models.Song.find()
  .then((songInfo) => {
    res.send(songInfo)
  })
  .catch((err) => {
    console.log('error getting song info from database, here is err: ', err)
    res.send(err)
  })
}

const notePoster = (req, res) => {
  new Models.Notes ({
    songName: req.body.songName,
    date: new Date().toString(),
    duration: Number(req.body.duration),
    notes: req.body.songNotes
  }).save()
  .then((dbRes) => {
    console.log('dbRes from notePoster : ', dbRes)
    res.send(dbRes)
    // update total minutes practiced for this song
    return Models.Song.findOneAndUpdate({songName: req.body.songName}, {$inc: {totalDuration: Number(req.body.duration)}})
  })
  .then((dbRes) => {
    console.log('updated total duration in db, here is dbRes', dbRes)
  })
  .catch((err) => {
    console.log('err in notePoster', err)
    res.send(err)
  })
}

const practiceLogRetriever = (req, res) => {
  //needs to get
  Models.Notes.find({songName: req.params.songName})
  .then((dbRes) => {
    totalPracticeTime(req,res,dbRes)
  })
  .catch((err) => {
    res.send(err)
  })
}

const totalPracticeTime = (req, res, practiceLog) => {
  // gets total time practiced, adds to practice log, sends to client
  Models.Song.find({songName: req.params.songName})
  .then((dbRes) => {
    let response = {practiceLog: {log: practiceLog, totalPracticeTime: dbRes[0].totalDuration}}
    res.send(response)
  })
  .catch((err) => {
    res.send(err)
  })
}

module.exports = {chunker, chunkRetriever, songsRetriever, notePoster, practiceLogRetriever}

/*
.then((dbRes) => {
      console.log('here is dbRes in controller', dbRes) // logs object from db
      return dbRes;
    })
*/