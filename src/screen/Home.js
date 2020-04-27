import React, {Component} from 'react';
import {Clipboard, View} from 'react-native';
import {Button, Snackbar} from 'react-native-paper';
import {WebView} from 'react-native-webview';

import ImageComponent from '../components/Shared/ImageComponent';
import TextComponent from '../components/Shared/TextComponent';
import {Colors} from '../constants/ThemeConstants';
import {widthPerc, heightPerc} from '../helpers/styleHelper';
import {FontType} from '../constants/AppConstants';

const Values = ['Name', 'Link', 'Image'];

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: null,
      Link: null,
      Image: null,
      IsYoutube: false,
      Category: null,
      visible: false,
      PastedValue: null,
    };
  }

  handleButtonClick = async (val) => {
    const copyString = await Clipboard.getString();
    this._onToggleSnackBar();
    this.setState({
      PastedValue: val,
      [val]: copyString,
    });
  };

  _onToggleSnackBar = () =>
    this.setState((state) => ({visible: !state.visible}));

  _onDismissSnackBar = () => this.setState({visible: false});

  _onToggleSwitch = () =>
    this.setState((state) => ({IsYoutube: !state.IsYoutube}));

  render() {
    const {visible, PastedValue, Image, Name, IsYoutube, Link} = this.state;
    console.log(Link);
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
          alignItems: 'center',
          paddingTop: 20,
        }}>
        <View style={{width: widthPerc(90)}}>
          <View
            style={{
              backgroundColor: Colors.themeBlack,
              width: '100%',
              height: 200,
            }}>
            {Link ? (
              <WebView
                style={{width: '100%', height: 200}}
                source={{uri: Link}}
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
              width: widthPerc(47),
              backgroundColor: Colors.white,
              marginHorizontal: widthPerc(1),
              backgroundColor: Colors.darkGrey,
              borderRadius: 5,
              elevation: 8,
              overflow: 'hidden',
              height: heightPerc(35),
              marginTop: 30,
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
          {Name && Image && Link && (
            <View style={{marginTop: 20}}>
              <Button
                style={{elevation: 10}}
                contentStyle={{backgroundColor: Colors.themeBlack}}
                icon="plus"
                mode="contained"
                onPress={() => console.log('val')}>
                Add Film
              </Button>
            </View>
          )}
        </View>
        <Snackbar visible={visible} onDismiss={this._onDismissSnackBar}>
          Movie {PastedValue} pasted successfully
        </Snackbar>
      </View>
    );
  }
}
