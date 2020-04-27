import React, {Component} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import {Colors} from '../../constants/ThemeConstants';
const {width, height} = Dimensions.get('window');

const colors = [Colors.themeBlack, Colors.yellow, Colors.blue];

class Loader extends Component {
  state = {
    StatusBarColor: Colors.themeRed,
  };

  componentDidMount() {
    let i = 0;
    setInterval(() => {
      if (i > 2) {
        i = 0;
      }
      this.setState(
        {
          StatusBarColor: colors[i],
        },
        () => {
          i++;
        },
      );
    }, 500);
  }

  render() {
    const {StatusBarColor} = this.state;
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: Colors.black,
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}>
        <StatusBar animated={true} backgroundColor={StatusBarColor} />
        <ActivityIndicator size="large" color={StatusBarColor} />
      </View>
    );
  }
}

export default Loader;
