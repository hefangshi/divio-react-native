'use strict';

var React = require('react-native');
var {
  StyleSheet,
  TabBarIOS,
} = React;

var TabBar = React.createClass({

  getInitialState() {
    return {
      selectedTab: this.props.defaultRoute
    };
  },

  render() {
    var items = this.props.routes.map((route) => {
      return (
        <TabBarIOS.Item
            title={route.title}
            systemIcon={route.icon}
            selected={this.state.selectedTab === route.id}
            onPress={() => {
              // this.props.getNav().updateNavBar({title: route.title})
              this.setState({
                selectedTab: route.id
              });
            }}>
            {this.state.selectedTab === route.id && route.render()}
          </TabBarIOS.Item>
      );
    });
    return (
      <TabBarIOS
        style={styles.navbar}
        tintColor="black">
        {items}
      </TabBarIOS>
    );
  }
});

var styles = StyleSheet.create({
  navbar: {
    flex: 1,
    // magic num when using tabbar with navigator
    marginTop: 64
  }
});

module.exports = TabBar;
