# Electron Meet Application

Purpose of that project is to have meet running
in a proper dedicated window, with a global shortcut
(CommandOrControl+Shift+D) to mute/unmute microphone
and having a visual feedback on microphone and camera status.

Touchbar visual feedbak and buttons is available.

An History of previous session is available with the possibility to
auto reconnect to the previous one.

An option to auto desactivate microphone/camera at the
beginning of each call is also available.

## Development

```
yarn
yarn icons
yarn start
```

## Build

### Osx Build

```
brew install yarn
yarn
yarn icons
yarn package:mac
```

### Linux Build
```
sudo apt-get update && sudo apt-get install yarn
yarn
yarn icons
yarn package:linux
```

### Windows Build
```
yarn
yarn icons
package:win
```
