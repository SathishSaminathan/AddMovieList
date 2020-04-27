import React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  View,
  ActivityIndicator,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import Feather from 'react-native-vector-icons/Feather';

import TextComponent from './TextComponent';
import {Colors} from '../../constants/ThemeConstants';

const ButtonComponent = props => {
  const {
    children,
    style,
    loading,
    onPress,
    icon,
    round,
    borderRadius = 5,
    fontColor = Colors.white,
    fontSize = 20,
  } = props;
  return (
    <Ripple
      rippleContainerBorderRadius={borderRadius}
      rippleColor={Colors.white}
      rippleSize={180}
      onPress={onPress}
      style={[
        {
          backgroundColor: style.backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: borderRadius,
          elevation: style.elevation || 10,
          height: style.height || 46,
        },
        {...style},
      ]}>
      <View
        style={[
          {
            backgroundColor: Colors.transparent,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            paddingVertical: 15,
            // paddingHorizontal: 20,
            backgroundColor: `${
              loading ? Colors.transparent : Colors.transparent
            }`,
            borderRadius: round ? 20 : 0,
          },
          // style,
        ]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TextComponent
            style={{
              fontSize: style.fontSize || 20,
              color: style.color || Colors.textWhite,
              fontFamily: style.fontFamily,
            }}>
            {children}
          </TextComponent>
          {!loading && icon && (
            <Feather style={{fontSize: 25}} name="arrow-right" />
          )}
        </View>
        {loading && (
          <ActivityIndicator
            style={{paddingLeft: 10}}
            color={Colors.white}
            size="small"></ActivityIndicator>
        )}
      </View>
    </Ripple>
  );
};

export default ButtonComponent;
