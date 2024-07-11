import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';
import Spacing from '../constants/Spacing';
import Colors from '../constants/Colors';

const IconButton = ({style, size = 24, color = Colors.text, name, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          height: 40,
          width: 40,
          borderWidth: 1,
          borderColor: Colors.border,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: Spacing.borderRadius.base,
        },
        style,
      ]}></TouchableOpacity>
  );
};

export default IconButton;
