/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var articleModel = require('../models/article.js');
var user = require('../models/user.js');
var ArticleDetail = require('./articleDetail.js');
var styles;

var {
    StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, TextInput
} = React;


var My = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {},
    render: function() {
        return (
          <View>
          </View>
        );
    }
});

styles = StyleSheet.create({});

module.exports = My;
