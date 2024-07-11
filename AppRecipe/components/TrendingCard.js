import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {SIZES, COLORS, FONTS} from '../screens/constants';

import {useEffect} from 'react';

const RecipeCardDetails = ({recipeItem}) => {
  useEffect(() => {
    //console.log(recipeItem);
  });

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.recipeCardTitle}>{recipeItem.title}</Text>
      </View>
      <Text style={styles.recipeCardInfo}>
        {recipeItem.readyInMinutes}Czas przygotowania: 10 min
        {'            '}
        <Text style={styles.recipeCardInfo}>
          Ilość porcji: {recipeItem.servings}
        </Text>
      </Text>
    </View>
  );
};

const RecipeCardInfo = ({recipeItem}) => {
  if (Platform.OS === 'ios') {
    return (
      <BlurView
        blurType="dark"
        overlayColor=""
        blurAmount={10}
        style={styles.recipeCardContainer}>
        <RecipeCardDetails recipeItem={recipeItem} />
      </BlurView>
    );
  } else {
    return (
      <View style={{...styles.recipeCardContainer, backgroundColor: 'black'}}>
        <RecipeCardDetails recipeItem={recipeItem} />
      </View>
    );
  }
};

const TrendingCard = ({containerStyle, recipeItem, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.trendingCardContainer,
        ...containerStyle,
      }}
      onPress={onPress}>
      <Image
        source={{uri: recipeItem.image}}
        resizeMode="cover"
        style={{
          width: 250,
          height: 350,
          borderRadius: SIZES.radius,
        }}
      />
      <View style={styles.dishTypeContainer}>
        <Text style={styles.dishTypeTitle}>{recipeItem.dishTypes}</Text>
      </View>
      <RecipeCardInfo recipeItem={recipeItem} />
    </TouchableOpacity>
  );
};

export default TrendingCard;

const styles = StyleSheet.create({
  recipeCardContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    height: 100,
    paddingVertical: SIZES.radius,
    paddingHorizontal: SIZES.base,
    borderRadius: SIZES.radius,
  },
  recipeCardTitle: {
    color: 'white',
    ...FONTS.h3,
    fontSize: 15,
  },
  recipeCardInfo: {
    color: 'gray',
    ...FONTS.body4,
  },
  trendingCardContainer: {
    height: 350,
    width: 250,
    marginTop: SIZES.radius,
    marginRight: 20,
    borderRadius: SIZES.radius,
  },
  dishTypeContainer: {
    position: 'absolute',
    top: 20,
    left: 15,
    paddingHorizontal: SIZES.radius,
    paddingVertical: 5,
    backgroundColor: 'black',
    borderRadius: SIZES.radius,
  },
  dishTypeTitle: {
    color: 'white',
    ...FONTS.h4,
  },
});
