'use strict';

var React = require('react-native');
var {
  StyleSheet,
  TabBarIOS,
} = React;

var TabBar = React.createClass({

  getInitialState: function () {
    return {
      selectedTab: this.props.defaultRoute
    };
  },

  render: function () {
    var items = this.props.routes.map((route) => {
      function onPress() {
        this.setState({
          selectedTab: route.id
        });
      }
      return (
        <TabBarIOS.Item
            title={route.title}
            systemIcon={route.icon}
            selected={this.state.selectedTab === route.id}
            onPress={onPress.bind(this)}>
            {this.state.selectedTab === route.id && route.render()}
          </TabBarIOS.Item>
      );
    });
    return (
      <TabBarIOS
        style={styles.navbar}
        tintColor="black"
        barTintColor="#3abeff">
        {items}
      </TabBarIOS>
    );
  }
});

var styles = StyleSheet.create({
  navbar: {
    flex: 1,
    paddingTop: 64
  }
});

module.exports = TabBar;
