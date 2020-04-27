import React from 'react';
import {Text, View, Image} from 'react-native';

const ImageComponent = props => (
  <Image
    style={{flex: 1, width: undefined, height: undefined}}
    resizeMode="cover"
    {...props}
  />
);

export default ImageComponent;
