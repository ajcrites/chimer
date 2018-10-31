const { fork, spawn } = require('child_process');
const { existsSync } = require('fs');
const minimist = require('minimist');

const config = minimist(process.argv.slice(2));

if (process.argv.length <= 2) {
  throw new Error('No command specified to chime for.');
}

const soundFile = config.sound || __dirname + '/chime.mp3';

if (!existsSync(soundFile)) {
  console.warn('Could not locate the specified sound file. Will exit "silently"');
}

spawn(process.argv[2], process.argv.slice(3, process.argv.length), {
  stdio: 'inherit',
}).on('exit', val => {
  const forked = fork(__dirname + '/play.js');
  forked.send(soundFile);

  process.exit(val);
});
