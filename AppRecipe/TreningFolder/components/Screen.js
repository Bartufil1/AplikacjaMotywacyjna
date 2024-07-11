import {Platform, SafeAreaView, StyleProp, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';

const Screen = ({style, children}) => {
  return (
    <SafeAreaView
      style={[
        {
          paddingTop: Platform.OS === 'android' ? 30 : 0,
        },
        style,
      ]}>
      {children}
    </SafeAreaView>
  );
};

export default Screen;
