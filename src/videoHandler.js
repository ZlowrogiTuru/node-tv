"use strict";

function VideoHandler() {
    this.queue = [];
    this.rotation = [];
    this.rotationUsed = [];
    this.nowPlaying = null;
    this.nowPlayingStart = new Date(0);
}

VideoHandler.prototype.addToQueue = function addToQueue(video) {
    this.queue.push(video);
};

VideoHandler.prototype.addToRotation = function addToRotation(video) {
    this.rotation.push(video);
};

VideoHandler.prototype.getNextVideo = function getNextVideo() {
    this.nowPlaying = null;

    if (this.queue.length > 0) {
        this.nowPlaying = this.queue.shift();
    } else {
        if (this.rotationUsed.length === 0 && this.rotation.length > 0) {
            this.rotationUsed = shuffle(this.rotation.slice(0));
        }

        if (this.rotationUsed.length > 0) {
            this.nowPlaying = this.rotationUsed.shift();
        }
    }

    this.nowPlayingStart = Date.now();
    return this.nowPlaying;
};

VideoHandler.prototype.getNowPlaying = function getNowPlaying() {
    if (this.nowPlaying) {
        this.nowPlaying.start = Math.floor((Date.now() - this.nowPlayingStart) / 1000);
    }

    return this.nowPlaying;
};

module.exports = new VideoHandler();

function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}