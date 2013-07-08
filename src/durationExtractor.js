"use strict";

var sites = {
    youtube: function (id, durationCallback) {
        var youtube = require("youtube-feeds");

        youtube.video(id, function(error, data) {
            durationCallback(data.duration);
        });
    }
}

exports.extract = function extract(video, durationCallback) {
    sites[video.site](video.id, durationCallback);
};