/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var articleModel = require('./models/article.js');
var user = require('./models/user.js');
var styles;

var {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ListView
} = React;


var ArticleList = React.createClass({
  getInitialState: function () {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  },
  componentDidMount: function () {
    this.getArticles(this.props.catalog, 1).then((dataSource) => {
      this.setState({
        dataSource: dataSource
      });
    });
  },
  getArticles: function (type, pageNumber) {
    return articleModel.getArticleList(type, pageNumber).then((articles) => {
      return this.state.dataSource.cloneWithRows(articles.topics);
    });
  },
  renderArticleItem: function (article) {
    var authorAvatar = user.getUserAvatar(article.user);
    return (
      <View style={styles.artileItem}>
        <Image
          source = {authorAvatar}
          style = {styles.authorImage}/>
        <View style={styles.articleInfo}>
          <Text style={styles.articleTitle}>
            {article.title}
          </Text>
          <View style={styles.catalog}>
            { article.pro_id &&
              <Text style={styles.proStyle}>
                专栏
              </Text>
            }
            <Text style={styles.nodeStyle}>
              {article.node.name}
            </Text>
          </View>
        </View>
        <View style={styles.readInfoContainer}>
          <Text style={styles.readInfo}>
            {article.replies_count} 回复
          </Text>
        </View>
      </View>
    );
  },
  render: function () {
    return (
      <ScrollView>
      <ListView
        style={styles.listView}
        dataSource={this.state.dataSource}
        renderRow={this.renderArticleItem} />
      </ScrollView>
    );
  }
});

styles = StyleSheet.create({
  listView: {
    paddingTop: 38
  },
  artileItem: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 5,
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ececec'
  },
  articleInfo: {
    flex: 1,
    flexDirection: 'column'
  },
  readInfoContainer: {
    position: 'absolute',
    bottom: 2,
    right: 15
  },
  readInfo: {
    color: '#888',
    textAlign: 'right',
    fontSize: 12
  },
  catalog: {
    flexDirection: 'row',
    flex: 1
  },
  proStyle: {
    backgroundColor: '#cc530a',
    color: '#fff',
    fontSize: 12,
    borderRadius: 2,
    paddingLeft: 4,
    paddingTop: 2,
    marginTop: 15,
    height: 16,
    width: 33
  },
  nodeStyle: {
    color: '#269f3f',
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    marginTop: 15,
    marginLeft: 5,
    flex: 1
  },
  articleTitle: {
    fontSize: 17,
    flex: 1,
    marginLeft: 4,
    marginRight: 10,
    color: '#555',
    fontWeight: '400'
  },
  authorImage: {
    width: 48,
    height: 48,
    backgroundColor: '#eaeaea',
    marginRight: 10,
    borderRadius: 6
  }
});

module.exports = ArticleList;
