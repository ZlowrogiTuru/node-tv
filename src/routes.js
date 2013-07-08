"use strict";

var siteMatcher = require("./siteMatcher");
var durationExtractor = require("./durationExtractor");
var videoHandler = require("./videoHandler");

module.exports = function (app) {
    app.get("/play", function (req, res) {
        var url = req.query.url;

        if (url) {
            var video = siteMatcher.matchUrl(url);

            if (video) {
                durationExtractor.extract(video, function (duration) {
                    video.duration = duration;

                    videoHandler.addToQueue(video);
                });
            }
        }

        res.send(200);
    });

    app.get("/queue", function (req, res) {
        var url = req.query.url;

        if (url) {
            var video = siteMatcher.matchUrl(url);

            if (video) {
                durationExtractor.extract(video, function (duration) {
                    video.duration = duration;

                    videoHandler.addToRotation(video);
                });
            }
        }

        res.send(200);
    });
};
