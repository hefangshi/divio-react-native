var htmlparser = require("../vendor/htmlparser2");
var entities = require('../vendor/entities')
var React = require('react-native');


var {
    Text,
    View,
    Image,
    StyleSheet,
    LinkingIOS
} = React;


var TagType = {
    'blockquote' : 1  , // 软Text，如果里面有view或者image就变成view，否则就是text，并且如果在最外面，套一个View
    'p'          : 1 ,
    'h1'         : 1 ,
    'h2'        : 1  ,
    'h3'        : 1  ,
    'h4'        : 1  ,
    'h5'        : 1  ,
    'h6'        : 1  ,
    'li'        : 1  ,
    'a' : 2,
    'strong' : 2,
    'em' : 2,
    'code' : 2,
};


function HTMLToElem(html, opts, callback){
    function convertHTML2Reactify(dom, parent, insideText, level){
        if(!level){
            level = 0;
        }
        if(!dom){
            return null;
        }

        return dom.map((node,index,list) => {


            //if (opts.customRenderer) {
            //    var rendered = opts.customRenderer(node, index, list)
            //    if (rendered || rendered === null) return rendered
            //}


            if(node.type === 'text'){
                if(!node.data.trim()){
                // 只有在最外层的空text节点干掉，因为最外层所有节点都会变成View节点，里面的Text节点要保留空格，
                // 但是无法解决<ul> <text><li>xx</li></ul>这种情况，所以先全部干掉吧。
                    return ;
                }
                var inside =  entities.decodeHTML(node.data);
                if(parent){
                    if((parent.name == "code"  || parent.name == "pre")){
                        inside = entities.decodeHTML(inside);
                    }else if(parent.name == "li"){
                        inside = "- " + inside;
                    }
                }
                return (
                    <Text
                        key={index}
                        style={parent ? opts.styles[parent.name] : null}
                        tagname="text"
                    >
                        {inside}
                    </Text>
                );
            }

            if(node.type === 'tag'){
                var linkPressHandler = null;
                if (node.name == 'a' && node.attribs && node.attribs.href) {
                    linkPressHandler = () => opts.linkHandler(entities.decodeHTML(node.attribs.href))
                }

                if(insideText){
                    return (
                        <Text
                            key={index}
                            tagname="text"
                        >
                            {convertHTML2Reactify(node.children, node, true, level+1)}
                        </Text>
                    );
                }

                //if(node.name == 'br'){
                //}


                if (node.name == 'img' && node.attribs && node.attribs.src) {
                    return (
                        <Image
                            style={opts.styles['img']}
                            source={{uri: node.attribs.src}}
                            tagname="image"
                        />
                    );
                }else if(TagType[node.name] == 1) {//软Text
                    var Ret = convertHTML2Reactify(node.children, node, false, level+1);
                    var _textFlag = true;
                    var _tmpReturn = "";
                    Ret.map(function(node,index,list){
                        if(!node){
                            return ;
                        }
                        if(
                            node.props.tagname &&
                            node.props.tagname != 'text' &&
                            TagType[node.props.tagname] != 2
                        ){
                            _tmpReturn += node.props.tagname + " ";
                            _textFlag = false;
                        }
                    });
                    if( _textFlag ){
                        if(level == 0){
                            return (
                                <View
                                    style={node.name ? opts.styles[node.name] : null}
                                    key={index}
                                    onPress={linkPressHandler}
                                    tagname="view"
                                >
                                    <Text tagname="text">
                                        {Ret}
                                    </Text>
                                </View>
                            )
                        }else{
                            return (
                                <Text key={index} onPress={linkPressHandler} tagname="text">
                                    {Ret}
                                </Text>
                            );
                        }
                    }else{
                        return (
                            <View
                                style={node.name ? opts.styles[node.name] : null}
                                key={index}
                                onPress={linkPressHandler}
                                tagname="view"
                            >
                                {Ret}
                            </View>
                        )
                    }
                }else if(TagType[node.name] == 2) {
                    return (
                        <Text key={index} onPress={linkPressHandler} tagname={node.name}>
                            {convertHTML2Reactify(node.children, node, true, level+1)}
                        </Text>
                    )
                }else{
                    return (
                        <View key={index} onPress={linkPressHandler} tagname="view">
                            {convertHTML2Reactify(node.children, node, false, level+1)}
                        </View>
                    )
                }
            }
        });

    }

    var handler = new htmlparser.DomHandler(function (error, dom) {
        if (error)
            callback(error);
        else
            callback(null,convertHTML2Reactify(dom));
    });
    var parser = new htmlparser.Parser(handler);
    parser.write(html);
    parser.done();
}



var HTMLText = React.createClass({
    getInitialState: function(){
        return {
            children: null
        };
    },
    getDefaultProps: function(){
        return {
            onPress: LinkingIOS.openURL
        };
    },
    componentDidMount: function(){
        this.renderHTML();
    },
    renderHTML: function(){
        if(!this.props.html){
            return true;
        }
        var _option = {
            linkHandler: this.props.onPress,
            styles: Object.assign({}, baseStyles, this.props.stylesheet),
        };

        HTMLToElem(this.props.html,_option, (error, element)=>{
            var elements = (
                <Text>{'Error!!!'}</Text>
            );

            if(!error){
                elements = element;
            }
            if(this.isMounted()){
                this.setState({
                    children: elements
                });
            }
        });

    },
    render: function(){
        if(this.state.children){
            return (<View children={this.state.children} />);
        } else{
            return (<Text />);
        }
    }
})



var boldStyle = {fontWeight: '500'}
var italicStyle = {fontStyle: 'italic'}
var codeStyle = {fontFamily: 'Menlo', backgroundColor:"#eeeeee", padding: 12,}

var baseStyles = StyleSheet.create({
    b: boldStyle,
    strong: boldStyle,
    i: italicStyle,
    em: italicStyle,
    pre: codeStyle,
    code: codeStyle,
    h1: {
        fontWeight: '900',
        fontSize: 24,
        paddingTop:5,
        paddingBottom:8,
    },
    h2: {
        fontWeight: '800',
        fontSize: 22,
        paddingTop:4,
        paddingBottom:7,
    },
    h3: {
        fontWeight: '800',
        fontSize: 20,
        paddingTop:3,
        paddingBottom:6,
    },
    h4: {
        fontWeight: '800',
        fontSize: 18,
        paddingTop:2,
        paddingBottom:4,
    },
    h5: {
        fontWeight: '800',
        fontSize: 16,
    },
    h6: {
        fontWeight: '500',
        fontSize: 14,
    },
    blockquote: {
        marginLeft: 20,
        marginTop:12,
        marginBottom:12,
        paddingLeft: 10,
        borderColor: '#dddddd',
        borderLeftWidth: 2,
    },
    img: {
        flex: 1,
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#eaeaea',
    },
    p:{
        paddingTop:12,
        paddingBottom:12,
        fontSize:14,
    },
    a: {
        fontWeight: '500',
        color: '#0082E3',
    },
})


module.exports = HTMLText;
