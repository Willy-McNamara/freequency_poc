# Freequency

Freequency : An app which helps a user learn a song by ear and repetition. The user uploads an mp3 which they can then chunk into learnable portions. The user then has access to simple playback features for these chunks to help break down the tedious nature of learning music by ear.

Potential features in future state:
- an integrated kanban board which organizes the users practice by the ‘chunk’
- Ability for the user to add notes and recordings to their chunks
- Generate a personalized visual token to commemorate a particularly tough section!
- Persisted data for each user
- Social aspect :
    - ‘Post’ meaningful chunks or sessions to your practice history


v0
- Webpage allows user to upload an mp3 via form
  - form collects
    - basic info on the song
    - the # of chunks to split the song into
    - the seconds mark indicating the end of each chunk
- form
- User can then play these chunks back by clicking
- Building out Chunk objects
  - Allow user to enter information about the chunk
    - Title
    - Notes

v1
- Addition of playback features
  - Loop
  - Speed manipulation
- Organize chunks into kanban board
- User uses sliders to chop up the mp3 into ‘chunks’

v3
- User can record a live take of this chunk to and save it on the chunk object
- User can generate a piece of art to commemorate chunk completion!

v4
- Basic auth through google
- Integrate database such that the user and their chunks are saved

