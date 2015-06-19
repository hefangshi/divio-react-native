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
  getRoutes: function() {
    var getNav = function () {
      console.log(this);
      return this.refs.nav;
    }.bind(this);
    return [{
      id: 'Index',
      title: '首页',
      icon: 'bookmarks',
      render: function () {
        return (
          <ArticleList catalog='Index' getNav={getNav}></ArticleList>
        );
      }
    }, {
      id: 'Pro',
      title: '专栏',
      icon: 'most-viewed',
      render: function () {
        return (
          <ArticleList catalog='Pro' getNav={getNav}></ArticleList>
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
        defaultRoute: 'Index',
        nav: this.refs.nav
      }
    };
  },
  render: function () {
    return (
        <NavigatorIOS
            ref="nav"
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
