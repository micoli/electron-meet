'use strict';

const Store = require('electron-store');
const MEET_ROOT = 'https://meet.google.com/';

class DataStore extends Store {
    constructor(settings) {
        super(settings);

        this.getHistory();
        this.getPosition();
        this.getPreferences();
    }

    flush() {
        this.set('history', this.history);
        this.set('position', this.position);
        this.set('preferences', this.preferences);
        return this;
    }

    getRoomUrl(tag) {
        return MEET_ROOT + tag;
    }

    getHomeUrl() {
        return MEET_ROOT;
    }

    getInitialUrl() {
        this.getHistory();
        if (!this.preferences.reconnectOnStartup) {
            return MEET_ROOT;
        }
        if (this.history.length === 0) {
            return MEET_ROOT;
        }
        return MEET_ROOT + this.history[0];
    }

    getHistory() {
        this.history = this.get('history') || [];
        return this.history;
    }

    getPosition() {
        this.position = this.get('position') || {x: 20, y: 20, width: 1000, height: 700};
        return this.position;
    }

    getPreferences() {
        this.preferences = this.get('preferences') || {
            microphoneOn: true,
            cameraOn: true,
            reconnectOnStartup: true,
        };
        return this.preferences;
    }

    addHistory(url) {
        const matches = url.match(/\/(([a-z]+)-([a-z]+)-([a-z]+))(\?.*)*/);
        if (!matches) {
            return this;
        }
        const tag = matches[1];

        if (this.history.indexOf(tag) !== -1) {
            this.deleteHistory(tag);
        }

        this.history = [tag, ...this.history];
        return this;
    }

    deleteHistory(url) {
        this.history = this.history.filter(currentUrl => currentUrl !== url);
        return this;
    }

    setPosition(x, y, width, height) {
        this.position = {
            x, y, width, height
        };
        return this;
    }

    setPreferenceMicrophoneOn(value) {
        this.getPreferences();
        this.preferences.microphoneOn = value;
        return this;
    }

    setPreferenceCameraOn(value) {
        this.getPreferences();
        this.preferences.cameraOn = value;
        return this;
    }

    setReconnectOnStartup(value) {
        this.getPreferences();
        this.preferences.reconnectOnStartup = value;
        return this;
    }
}

module.exports = new DataStore();
