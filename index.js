"use strict";

var express = require("express");
var app = express();
var socketio = require("socket.io");
var routes = require("./src/routes");
var videoHandler = require("./src/videoHandler");

app.use(express.static("src/static"));

routes(app);

var server = app.listen(80);
var io = socketio.listen(server);

function getNextVideo() {
    var video = videoHandler.getNextVideo();
    var timeout = 1000;

    if (video) {
        io.sockets.emit("playVideo", video);
        timeout = video.duration * 1000;
    }

    setTimeout(getNextVideo, timeout);
}

getNextVideo();

io.sockets.on("connection", function (socket) {
    var nowPlaying = videoHandler.getNowPlaying();

    if (nowPlaying) {
        socket.emit("playVideo", nowPlaying);
    }
});