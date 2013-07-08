(function(window) {
    "use strict";

    function YTPlayer(placeholderId) {
        var self = this;
        this.ready = false;
        var params = { allowScriptAccess: "always" };
        var attrs = { id: "player" };
        swfobject.embedSWF("http://www.youtube.com/apiplayer?enablejsapi=1&version=3&modestbranding=1",
            placeholderId, "100%", "100%", "8", null, null, params, attrs, playerReady);

        function playerReady() {
            self.player = document.getElementById("player");
        }

        window.onYouTubePlayerReady = function (playerId) {
            self.ready = true;
        }
    }

    YTPlayer.prototype.playerReady = function playerReady() {
        return this.ready;
    }

    YTPlayer.prototype.playVideo = function playVideo(id, startTime) {
        this.player.loadVideoById(id, startTime);
    }

    window["players"] = window["players"] || [];
    window["players"]["youtube"] = YTPlayer;


})(window);
