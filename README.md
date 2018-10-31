# chimer

`chimer` is a simple command line utility that plays a sound when a command
finishes running. I mostly made this for myself so that if I'm looking at
another window or my phone I'll know when some long-running command such as a
compiler has finished.

## Usage

`chimer [--sound <sound-file>] command...`

This will run the given command and then play the provided sound file when that
command completes. `--sound` is optional. By default, the chime.mp3 file
included in this package will play instead. If `--sound` is not found,
`chimer` will print a warning and continue normally, but no sound will play
when the command is done.
