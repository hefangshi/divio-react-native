/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var nodeModel = require('../models/node.js');
var styles;

var {
    StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, TextInput
} = React;

var Catalog = React.createClass({
    getInitialState: function() {
        return {
            nodes: []
        };
    },
    componentDidMount: function() {
        nodeModel.getNodeInfo().then((info) => {
            var nodeIDs = Object.keys(info);
            var items = [];
            for (var i = 0; i < nodeIDs.length; i++) {
                items.push({
                    id: nodeIDs[i],
                    name: info[nodeIDs[i]].name
                });
            };
            this.setState({
                nodes: items
            });
        });
    },
    onChooseNode(node) {
        return function () {
            alert(node.name);
        }
    },
    render: function() {
        return (
          <ScrollView
            horizontal={true}
            directionalLockEnabled={true}
            style={[styles.scrollView]}>
            {this.state.nodes.map((node) => {
                return (
                    <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.15)" onPress={this.onChooseNode(node)}>
                        <Text style={styles.node}>{node.name}</Text>
                    </TouchableHighlight>
                );
            })}
          </ScrollView>
        );
    }
});

styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#fff',
        height: 30,
    },
    node: {
        paddingRight: 4,
        paddingLeft: 4,
        paddingTop: 2,
        paddingBottom: 2,
        color: '#428bca'
    }
});

module.exports = Catalog;
