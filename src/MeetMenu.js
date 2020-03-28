const {Menu} = require('electron');
const dataStore = require('./DataStore');
const Bus = require('./Bus');
const Icons = require('./Icons');
const ElectronMeet = require('./ElectronMeet');

let contextMenu;

const displayMenu = (tray) => {
    let localPreferences = dataStore.getPreferences();
    const mainMenuTemplate = [{
        label: 'Microphone',
        id: 'is-microphone-on',
        type: 'checkbox',
        icon: Icons.microphoneOn,
        click: function () {
            ElectronMeet.status(function (status) {
                Bus.emit('change-microphone', !status.isMicrophoneOn);
            });
        }
    }, {
        label: 'Camera',
        id: 'is-camera-on',
        type: 'checkbox',
        icon: Icons.camera,
        click: function () {
            ElectronMeet.status(function (status) {
                Bus.emit('change-camera', !status.isCameraOn);
            });
            //ElectronMeet.action(mainWindow, lastElectronMeetStatus.isCameraOn ? 'setCameraOff' : 'setCameraOn');
        }
    }, {
        type: 'separator'
    }, {
        label: 'Main window',
        click: function () {
            Bus.emit('create-window');

        }
    }, {
        label: 'Autoreconnect on startup',
        type: 'checkbox',
        checked: localPreferences.reconnectOnStartup,
        click: function (item) {
            let preferences = dataStore.getPreferences();
            dataStore.setReconnectOnStartup(!preferences.reconnectOnStartup).flush();
            displayMenu(tray)
        }
    }, {
        label: 'Microphone On by default',
        type: 'checkbox',
        checked: localPreferences.microphoneOn,
        click: function (item) {
            let preferences = dataStore.getPreferences();
            dataStore.setPreferenceMicrophoneOn(!preferences.microphoneOn).flush();
            displayMenu(tray)
        }
    }, {
        label: 'Camera On by default',
        type: 'checkbox',
        checked: localPreferences.cameraOn,
        click: function (item) {
            let preferences = dataStore.getPreferences();
            dataStore.setPreferenceCameraOn(!preferences.cameraOn).flush();
            displayMenu(tray)
        }
    }, {
        type: 'separator'
    }];

    dataStore.getHistory().forEach(function (tag) {
        mainMenuTemplate.push({
            label: tag,
            click: function (menuItem) {
                Bus.emit('open-room', menuItem.label);
            }
        });
    });

    contextMenu = Menu.buildFromTemplate(mainMenuTemplate);
    tray.setContextMenu(contextMenu);
};

Bus.on('microphone-status', (value) => {
    contextMenu.getMenuItemById('is-microphone-on').checked = value;
});
Bus.on('camera-status', (value) => {
    contextMenu.getMenuItemById('is-camera-on').checked = value;
});

module.exports = displayMenu;
