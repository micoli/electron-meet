const Bus = require('./Bus');

let localMainWindow;

const init = (mainWindow) => {
    localMainWindow = mainWindow
};

const action = function(action){
    if(!localMainWindow){
        return;
    }
    localMainWindow
        .webContents
        .executeJavaScript(`document.electronMeetActions.${action}()`)
        .then(function(electronMeet){});
};

const status = function(cb){
    if(!localMainWindow){
        return;
    }
    localMainWindow
        .webContents
        .executeJavaScript(`document.electronMeetStatus`)
        .then(cb);
};

Bus.on('change-microphone', (state)=>{
    action(state? 'setMicrophoneOn' : 'setMicrophoneOff');
});

Bus.on('change-camera', (state)=>{
    action(state? 'setCameraOn' : 'setCameraOff');
});

module.exports={
    init,
    action ,
    status
};
