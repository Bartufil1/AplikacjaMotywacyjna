import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import FontSize from '../constants/FontSize';
import Spacing from '../constants/Spacing';
import AppText from './AppText';
import Colors from '../constants/Colors';

const SectionHeader = ({title}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: Spacing.margin.lg,
      }}>
      <AppText>{title}</AppText>
      <TouchableOpacity>
        <AppText
          style={{
            fontSize: FontSize.sm,
            color: 'orange',
          }}></AppText>
      </TouchableOpacity>
    </View>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({});
