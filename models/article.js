'use strict';
var fetch = require('fetch');
var nodeModel = require('./node.js');

module.exports.getArticleList = function (type, page: Number) {
    var typeSplit = type.split('_');
    var ArticleClass = typeSplit[0];
    var provider = new supportedProvider[ArticleClass](typeSplit[1]);
    return provider.getList(page).then((list) => provider.format(page, list));
};

var supportedProvider = {
    'Index': IndexArticle,
    'Node': NodeArticle,
    'Pro': ProArticle
}

class ArticleProvider {
    constructor() {}

    getList(page: Number) {}

    format(page: Number, list: Array < any > ) {
        list.page = page;

        return nodeModel.getNodeInfo().then((info) => {
            list.topics.forEach(function (topic) {
                topic.node = info[topic.node_id];
            });
            return list;
        });
    }
}

class IndexArticle extends ArticleProvider {
    getList(page: Number) {
        return fetch.fetch('http://div.io/api/index_article_list/' + page)
            .then((response) => response.json());
    }
}

class ProArticle extends ArticleProvider {
    getList(page: Number) {
        return fetch.fetch('http://div.io/api/pro_article_list/' + page)
            .then((response) => response.json());
    }

    format(page: Number, list: Array < any > ) {
        list.topics = list.pro;
        list.pro = null;
        return super(page, list);
    }
}

class NodeArticle extends ArticleProvider {
    constructor(node: Number) {
        this.node = node;
        super();
    }

    getList(page: Number) {
        return fetch.fetch('http://div.io/api/node/' + this.node + '/page/' + page)
            .then((response) => response.json());
    }
}
