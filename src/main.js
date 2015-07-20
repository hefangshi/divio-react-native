/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var TabBar = require('./tabbar');

var ArticleList = require('./page/articleList');
var My = require('./page/my');
var Catalog = require('./partial/catalog');

var styles;
var {
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  AppRegistry
} = React;

var divio = React.createClass({
  getInitialState() {
    return {};
  },
  getRoutes() {
    var getNav = function () {
        return this.refs.nav;
    }.bind(this);
    return [{
      id: 'Index',
      title: '首页',
      render: () => {
        return (
          <View>
            <Catalog></Catalog>
            <ArticleList catalog='Index' getNav={getNav}></ArticleList>
          </View>
        );
      }
    }, {
      id: 'Pro',
      title: '专栏',
      render: () => {
        return (
          <ArticleList catalog='Pro' getNav={getNav}></ArticleList>
        );
      }
    }, {
      id: 'Dig',
      title: '发现',
      render: () => {
        return (
          <View>
            <Text>Hello</Text>
          </View>
        );
      }
    }, {
      id: 'My',
      title: '我',
      render: () => {
        return (
          <View>
            <My></My>
          </View>
        );
      }
    }]
  },
  getInitialRoute() {
    return {
      component: TabBar,
      title: 'Div.IO',
      passProps: {
        routes: this.getRoutes(),
        defaultRoute: 'Index',
        getNav: () => {
          return this.refs.nav;
        }
      }
    };
  },
  render() {
    return (
        <NavigatorIOS
            ref="nav"
            barTintColor="#318853"
            tintColor="#fff"
            titleTextColor="#fff"
            translucent={true}
            style={styles.container}
            initialRoute={this.getInitialRoute(this)}/>
    );
  }
});

styles = StyleSheet.create({
  container: {
      flex: 1
  }
});

AppRegistry.registerComponent('divio', () => divio);
