#!/usr/bin/env node

const { fork, spawn } = require('child_process');
const { existsSync } = require('fs');
const minimist = require('minimist');

let argv = process.argv;

const config = minimist(argv.slice(2));

if (argv.length <= 2) {
  throw new Error('No command specified to chime for.');
}

let soundFile = __dirname + '/chime.mp3';
if (config.sound) {
  soundFile = config.sound;
  argv.splice(argv.indexOf('--sound'), 2);
}
const soundFileExists = existsSync(soundFile);

if (!soundFileExists) {
  console.warn('Could not locate the specified sound file. Will exit *silently*.');
}

spawn(argv[2], argv.slice(3, argv.length), {
  stdio: 'inherit',
}).on('exit', val => {
  if (soundFileExists) {
    const forked = fork(__dirname + '/play.js');
    forked.send(soundFile);
  }

  process.exit(val);
});
