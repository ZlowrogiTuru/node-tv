"use strict";

var sites = {
    youtube: /(?:http(?:s?):\/\/)(?:www\.)?youtu(?:be\.com\/watch\?(?:.*?&(?:amp;)?)?v=|\.be\/)([\w‌​\-]+)(?:&(?:amp;)?[\w\?=]*)?/i
};

exports.matchUrl = function matchUrl(url) {
    for (var site in sites) {
        if (sites.hasOwnProperty(site)) {
            var matches = url.match(sites[site]);

            if (matches[1]) {
                return { site: site, id: matches[1] };
            }
        }
    }
};