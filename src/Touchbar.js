const Bus = require('./Bus');
const {TouchBar} = require('electron');
const ElectronMeet = require('./ElectronMeet');
const {TouchBarButton} = TouchBar;

const colorOn = '#a9070e';
const colorOff = '#2ca93c';

const microphone = new TouchBarButton({
    label: '🎙️ Microphone',
    backgroundColor: colorOff,
    click: () => {
        ElectronMeet.status(function (status) {
            Bus.emit('change-microphone', !status.isMicrophoneOn);
        });
    }
});

const camera = new TouchBarButton({
    label: '📷️ Camera',
    backgroundColor: '#2ca93c',
    click: () => {
        ElectronMeet.status(function (status) {
            Bus.emit('change-camera', !status.isCameraOn);
        });
    }
});

Bus.on('microphone-status', (value) => {
    microphone.backgroundColor = value ? colorOff : colorOn;
});
Bus.on('camera-status', (value) => {
    camera.backgroundColor = value ? colorOff : colorOn;
});

module.exports = new TouchBar({
    items: [
        microphone,
        camera
    ]
});
