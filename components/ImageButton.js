import React from 'react';
import { Image, StyleProp, TextStyle } from 'react-native';
import { TouchableRipple, Text } from 'react-native-paper';

const ImageButton = ({ style, onPress }) => {
  return (
    <TouchableRipple style={style} onPress={onPress}>
      <Image style={{ margin: 8 }} source={require('../assets/images/Filter.png')} />
    </TouchableRipple>
  );
};

export default ImageButton;
