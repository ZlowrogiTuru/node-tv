(function() {
    "use strict";

    var socket = io.connect();

    function restorePlaceholder() {
        var container = $("#container");
        container.empty();
        container.append("<div id=\"player-placeholder\"></div>")
    }

    function waitForReady(player, waitForReadyCallback) {
        if (!player.playerReady()) {
            setTimeout(function() { waitForReady(player, waitForReadyCallback); }, 100);
        } else {
            waitForReadyCallback();
        }
    }

    var currentPlayerType;
    var player;

    socket.on("playVideo", function (data) {
        if (currentPlayerType !== data.site) {
            restorePlaceholder();

            player = new window.players[data.site]("player-placeholder");
            currentPlayerType = data.site;
        }

        waitForReady(player, function() {
            var startTime = 0;

            if (data.start) {
                var startTime = data.start;
            }

            player.playVideo(data.id, startTime);
        });
    });
})();