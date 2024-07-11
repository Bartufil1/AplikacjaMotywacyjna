import React from 'react';
import {TouchableOpacity, Image, Text, View, StyleSheet} from 'react-native';

import {COLORS, FONTS, SIZES} from '../screens/constants';

const CategoryCard = ({containerStyle, categoryItem, onPress}) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}>
      <Image
        source={{uri: categoryItem.image}}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{categoryItem.name}</Text>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/5126/5126846.png',
          }}
        />
        <Text style={styles.subtitle}>{categoryItem.title}</Text>
        <Text style={styles.mintitle}>
          Czas przygotowania: 25 {categoryItem.readyInMinutes} min
          {'           '}Ilosc pocji:
          {categoryItem.servings}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    borderRadius: SIZES.radius,
    backgroundColor: '#1C1C1E',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: SIZES.radius,
  },
  textContainer: {
    width: '65%',
    paddingHorizontal: 20,
  },
  title: {
    flex: 1,
    ...FONTS.h2,
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: COLORS.white,
    ...FONTS.body4,
  },
  mintitle: {
    color: COLORS.gray,
    ...FONTS.body4,
  },
});

export default CategoryCard;
