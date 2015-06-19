/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var ArticleList = require('./ArticleList');
var TabBar = require('./TabBar');
var styles;
var {
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  AppRegistry
} = React;

var divio = React.createClass({
  getInitialState: function () {
    return {};
  },
  getRoutes: () => {
    return [{
      id: 'Index',
      title: '首页',
      icon: 'bookmarks',
      render: function () {
        return (
          <ArticleList catalog='Index'></ArticleList>
        );
      }
    }, {
      id: 'Pro',
      title: '专栏',
      icon: 'most-viewed',
      render: function () {
        return (
          <ArticleList catalog='Pro'></ArticleList>
        );
      }
    }, {
      id: 'Dig',
      title: '发现',
      icon: 'favorites',
      render: function () {
        return (
          <View>
          <Text>Hello</Text>
        </View>
        );
      }
    }, {
      id: 'Setting',
      title: '设置',
      icon: 'more',
      render: function () {
        return (
          <View></View>
        );
      }
    }];
  },
  getInitialRoute: function () {
    return {
      component: TabBar,
      title: 'Div.IO',
      passProps: {
        routes: this.getRoutes(),
        defaultRoute: 'Index'
      }
    };
  },
  render: function () {
    return (
        <NavigatorIOS
            style={styles.container}
            initialRoute={this.getInitialRoute()}/>
    );
  }
});

styles = StyleSheet.create({
  container: {
      flex: 1
  }
});

AppRegistry.registerComponent('divio', () => divio);
