process.on('message', soundFile => {
  const player = require('play-sound')();
  player.play(soundFile);
});
