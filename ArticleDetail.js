/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @flow
 */
'use strict';

var React = require('react-native');
var user = require('./models/user.js');
var articleModel = require('./models/article.js');
var HTMLView = require('./HTMLView.js');

var {
    Image,
    PixelRatio,
    ScrollView,
    StyleSheet,
    ListView,
    WebView,
    ActivityIndicatorIOS,
    Text,
    View,
    } = React;

var ArticleDetail = React.createClass({

    getInitialState: function() {
        return {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    },

    getDataSource: function(articleContents: Array<any>): ListView.DataSource {
        return this.state.dataSource.cloneWithRows(articleContents);
    },

    componentDidMount: function() {
        articleModel.getArticle(this.props.id)
            .then((responseData) => {
                this.setState({
                    dataSource: this.getDataSource(responseData.knots),
                });
            })
            .catch((error) => {
                // 无效
                this.props.nav.pop();
            })
            .done();
    },

    renderRow : function(knot){
        var authorAvatar = user.getUserAvatar(knot.user);
        return (
            <View style={styles.mainSection}>
                <Image source={authorAvatar} style={styles.detailsImage}/>
                <Text>
                    {knot.user.username}
                </Text>
                <View style={styles.rightPane}>
                    <Text style={styles.movieTitle}>{knot.title ? knot.title : ""}</Text>
                    <HTMLView
                        html={knot.content ? knot.content: ""}
                        stylesheet={ArticleStyle}
                        style={styles.article}/>
                </View>
                <View style={styles.separator} />
            </View>
        );
    },

    renderFooter: function(){

    },

    onEndReached: function(){

    },

    onRenderError: function(error){
      console.err(error);
    },

    onRenderLoading: function () {},

    render: function() {
        return (
            <View style={styles.container}>
                 <ListView
                     style={styles.container}
                     ref="listview"
                     dataSource={this.state.dataSource}
                     renderFooter={this.renderFooter}
                     renderRow={this.renderRow}
                     onEndReached={this.onEndReached}
                     automaticallyAdjustContentInsets={false}
                     keyboardDismissMode="onDrag"
                     keyboardShouldPersistTaps={true}
                     showsVerticalScrollIndicator={false}/>
            </View>

        );
    }
});

var ArticleStyle = StyleSheet.create({
    a: {
        fontWeight: '300',
        color: '#FF3366' // pink links
    },
});



var styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 32,
        marginLeft: 5,
        marginRight: 5,
    },
    rightPane: {
        justifyContent: 'space-between',
        flex: 1,
    },
    movieTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
    },
    ratingTitle: {
        fontSize: 14,
    },
    ratingValue: {
        fontSize: 28,
        fontWeight: '500',
    },
    mainSection: {
        backgroundColor: 'white',
    },
    detailsImage: {
        width: 60,
        height: 60,
        backgroundColor: '#eaeaea',
        marginRight: 10,
    },
    separator: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height: 1 / PixelRatio.get(),
        marginVertical: 10,
    },
    comments : {
        color: "#739b66",
    },
    webView: {
        flex: 1,
        flexDirection: 'row',
        height: 100,
        backgroundColor: 'rgba(255,255,255,0.8)',
    },
    article: {
        fontSize: 18,//失效???
    },
});

module.exports = ArticleDetail;
