import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Font from '../constants/Font';
import Spacing from '../constants/Spacing';
import AppText from './AppText';
import Colors from '../constants/Colors';
import {Workout as WorkoutType} from '../data';
import Rating from 'react-native-easy-rating';
//KAfelki z cwiczeniami na glwnej stornie.
const Workout = ({workout, onPress}) => {
  return (
    //Style do kafelkow z cwiczeniami an stronie głównej.
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: 'orange',
        marginRight: Spacing.margin.lg,
        borderRadius: Spacing.borderRadius.base,
        overflow: 'hidden',
      }}>
      <Image
        source={{uri: workout.image}}
        style={{
          width: 270,
          height: 200,
        }}
      />
      <View
        style={{
          padding: Spacing.padding.base,
        }}>
        <View
          style={{
            marginBottom: Spacing.margin.base,
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <AppText
            style={{
              fontFamily: Font['poppins-semiBold'],
            }}>
            {workout.name}
          </AppText>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Rating
              rating={workout.rating}
              max={5}
              iconWidth={20}
              iconHeight={20}
            />
            <AppText
              style={{
                marginLeft: Spacing.margin.sm,
              }}>
              {workout.rating}
            </AppText>
          </View>
        </View>
        <AppText>{workout.coach}</AppText>
      </View>
    </TouchableOpacity>
  );
};

export default Workout;

const styles = StyleSheet.create({});
