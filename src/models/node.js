'use strict';
var fetch = require('fetch');
var nodeCache;
var Promise = require('bluebird');

module.exports.getNodeInfo = function () {
    if (nodeCache) {
        return Promise.resolve(nodeCache);
    }
    return fetch.fetch('http://div.io/api/node-info')
        .then((response) => response.json())
        .then((info) => {
        nodeCache = {};
        info.nodes.forEach(function (node) {
            nodeCache[node.id] = node;
        });
        return nodeCache;
    });
};
