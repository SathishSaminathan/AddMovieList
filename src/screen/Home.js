import React, {Component} from 'react';
import {Clipboard, View, ScrollView} from 'react-native';
import {Button, Snackbar, RadioButton, Switch} from 'react-native-paper';
import {WebView} from 'react-native-webview';
import firestore from '@react-native-firebase/firestore';

import ImageComponent from '../components/Shared/ImageComponent';
import TextComponent from '../components/Shared/TextComponent';
import {Colors} from '../constants/ThemeConstants';
import {widthPerc, heightPerc} from '../helpers/styleHelper';
import {FontType} from '../constants/AppConstants';

const Values = ['Name', 'Link', 'Image'];

const Categories = ['Action', 'Ghost', 'Horror', 'Fantasy'];

const ref = firestore().collection('movielist');

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.getInitialState(),
    };
  }

  getInitialState = () => {
    return {
      Name: null,
      Link: null,
      Image: null,
      IsYoutube: false,
      Category: 'Action',
      visible: false,
      PastedValue: null,
    };
  };

  handleButtonClick = async (val) => {
    const copyString = await Clipboard.getString();
    this._onToggleSnackBar();
    this.setState({
      PastedValue: val,
      [val]: copyString,
    });
  };

  handleYoutubeLink = async () => {
    const copyString = await Clipboard.getString();
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = copyString.match(regExp);
    let Link = match && match[2].length == 11 ? match[2] : false;

    this.setState({
      Link,
      Image: `https://img.youtube.com/vi/${Link}/maxresdefault.jpg`,
    });
  };

  reset = () => {
    this.setState({
      ...this.getInitialState(),
    });
  };

  _onToggleSwitch = () => {
    this.setState((state) => ({
      ...this.getInitialState(),
      IsYoutube: !state.IsYoutube,
    }));
  };

  _onToggleSnackBar = () => this.setState((state) => ({visible: true}));

  _onDismissSnackBar = () => this.setState({visible: false});

  handleSubmit = ({Name, Image, Category, Link}) => {
    ref.doc(Name).set({Name, Image, Category, Link});
    this.reset();
  };

  render() {
    const {
      visible,
      PastedValue,
      Image,
      Name,
      IsYoutube,
      Link,
      Category,
    } = this.state;
    console.log(this.state);
    return (
      <View
        style={{flex: 1, paddingVertical: 10, backgroundColor: Colors.white}}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: Colors.white,
            alignItems: 'center',
            paddingTop: 20,
          }}>
          <View style={{width: widthPerc(90)}}>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <TextComponent
                style={{color: Colors.themeBlack, fontSize: 18}}
                type={FontType.BOLD}>
                Youtube?{' '}
              </TextComponent>
              <Switch
                color={Colors.themeBlack}
                value={IsYoutube}
                onValueChange={this._onToggleSwitch}
              />
            </View>
            {IsYoutube && (
              <View style={{paddingVertical: 10}}>
                <Button
                  style={{elevation: 10}}
                  contentStyle={{backgroundColor: Colors.themeBlack}}
                  icon="clipboard"
                  mode="contained"
                  onPress={() => this.handleYoutubeLink()}>
                  Youtube link
                </Button>
              </View>
            )}
            <View
              style={{
                backgroundColor: Colors.themeBlack,
                width: '100%',
                height: 200,
              }}>
              {Link ? (
                <WebView
                  style={{width: '100%', height: 200}}
                  source={{
                    uri: IsYoutube
                      ? `https://www.youtube.com/embed/${Link}`
                      : Link,
                  }}
                />
              ) : (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TextComponent
                    style={{color: Colors.white, fontSize: 20}}
                    type={FontType.BOLD}>
                    Paste Video Link
                  </TextComponent>
                </View>
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              {Values.map((val, i) => (
                <Button
                  key={i}
                  contentStyle={{backgroundColor: Colors.themeBlack}}
                  icon="clipboard"
                  mode="contained"
                  onPress={() => this.handleButtonClick(val)}>
                  {val}
                </Button>
              ))}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                paddingVertical: 10,
              }}>
              <RadioButton.Group
                onValueChange={(Category) => this.setState({Category})}
                value={Category}>
                {Categories.map((cat, i) => (
                  <View key={i}>
                    <TextComponent type={FontType.BOLD}>{cat}</TextComponent>
                    <RadioButton color={Colors.themeBlack} value={cat} />
                  </View>
                ))}
              </RadioButton.Group>
            </View>
            <View
              style={{
                width: widthPerc(47),
                backgroundColor: Colors.white,
                marginHorizontal: widthPerc(1),
                backgroundColor: Colors.darkGrey,
                borderRadius: 5,
                // elevation: 8,
                overflow: 'hidden',
                height: heightPerc(35),
                marginTop: 10,
                alignSelf: 'center',
              }}>
              <View style={{flex: 8}}>
                <ImageComponent
                  style={{flex: 1, width: undefined, height: undefined}}
                  resizeMode="cover"
                  source={{uri: Image}}
                />
              </View>
              <View
                style={{
                  flex: 2,
                  padding: 5,
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}>
                <TextComponent
                  type={FontType.BOLD}
                  numberOfLines={2}
                  style={{color: Colors.yellow, fontSize: 15}}>
                  {Name}
                </TextComponent>
              </View>
            </View>
            {Name && Image && Link && Category && (
              <View style={{marginTop: 20}}>
                <Button
                  style={{elevation: 10}}
                  contentStyle={{backgroundColor: Colors.themeBlack}}
                  icon="plus"
                  mode="contained"
                  onPress={() => this.handleSubmit(this.state)}>
                  Add Film
                </Button>
              </View>
            )}
          </View>
        </ScrollView>
        <Snackbar
          duration={100}
          visible={visible}
          onDismiss={this._onDismissSnackBar}>
          Movie {PastedValue} pasted successfully
        </Snackbar>
      </View>
    );
  }
}
