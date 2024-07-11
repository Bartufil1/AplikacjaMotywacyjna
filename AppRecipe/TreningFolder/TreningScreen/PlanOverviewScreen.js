import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import AppText from '../components/AppText';
import IconButton from '../components/IconButton';
import Spacing from '../constants/Spacing';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import Font from '../constants/Font';
import Colors from '../constants/Colors';
import FontSize from '../constants/FontSize';
import Button from '../components/Button';
import Screen from '../components/Screen';
import {useNavigation} from '@react-navigation/native';

const PlanOverviewScreen = ({route, navigation: {goBack}}) => {
  const workout = route.params.workout;
  return (
    <Screen
      style={{
        backgroundColor: 'black',
      }}>
      <ScrollView
        style={{
          backgroundColor: 'black',
          paddingHorizontal: Spacing.padding.base,
        }}>
        <View
          style={{
            alignItems: 'center',
            paddingVertical: Spacing.padding.base,
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => goBack()}
            style={{position: 'absolute', left: 0}}>
            <Image
              source={require('../assets/images/backarrow.png')}
              style={{
                width: 35,
                height: 35,
              }}
            />
          </TouchableOpacity>
          <AppText style={{marginLeft: 10}}>Plan ćwiczeń</AppText>
        </View>
        <ImageBackground
          source={{uri: workout.image}}
          style={{
            height: 250,
            marginVertical: Spacing.margin.lg,
            borderRadius: Spacing.borderRadius.base,
            overflow: 'hidden',
            justifyContent: 'space-between',
            paddingVertical: Spacing.padding.base,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}></View>
        </ImageBackground>
        <View
          style={{
            // backgroundColor: '#1C1C1E',
            //paddingHorizontal: Spacing.padding.base,
            // borderRadius: Spacing.borderRadius.base,
            //  overflow: 'hidden',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 65,
          }}>
          <View style={{flex: 1}}>
            <AppText
              style={{
                fontFamily: Font['poppins-semiBold'],
                color: 'orange',
                marginLeft: 8,
              }}>
              {workout.minutes}
            </AppText>
            <AppText style={{fontSize: FontSize.sm}}>Czas</AppText>
          </View>
          <View style={{flex: 1}}>
            <AppText
              style={{
                fontFamily: Font['poppins-semiBold'],
                color: 'orange',
                marginLeft: 9,
              }}>
              {workout.calories}
            </AppText>
            <AppText style={{fontSize: FontSize.sm}}>Kalorie</AppText>
          </View>
          <View style={{flex: 1}}>
            <AppText
              style={{
                fontFamily: Font['poppins-semiBold'],
                color: 'orange',
                marginLeft: 12,
              }}>
              {workout.exercises.length}
            </AppText>
            <AppText style={{fontSize: FontSize.sm}}>Seria</AppText>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 15,
          }}>
          <AppText
            style={{
              fontSize: FontSize.lg,
              fontFamily: Font['poppins-semiBold'],
              marginTop: 10,
              color: 'orange',
            }}>
            {workout.name}
          </AppText>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <AppText
              style={{
                marginLeft: Spacing.margin.sm, // Co to jest tem rating
              }}></AppText>
          </View>
        </View>
        <AppText
          style={
            {
              //marginTop: Spacing.margin.sm,
            }
          }></AppText>
        <AppText
          style={{
            marginTop: Spacing.margin.base,
            fontFamily: Font['poppins-semiBold'],
            textAlign: 'center', // Wyśrodkowanie tekstu
          }}>
          Opis ćwiczenia:
        </AppText>
        <AppText
          style={{
            marginTop: Spacing.margin.sm,
            fontFamily: Font['poppins-regular'],
            marginTop: 10,
          }}>
          {workout.description}
        </AppText>
        <AppText
          style={{
            marginVertical: Spacing.margin.base,
            fontFamily: Font['poppins-semiBold'],
            color: 'white',
          }}>
          Ćwiczenia w Planie ({workout.exercises.length})
        </AppText>

        {workout.exercises.map(exercise => (
          <TouchableOpacity
            style={{
              backgroundColor: '#1C1C1E',
              borderRadius: Spacing.borderRadius.base,
              marginBottom: Spacing.margin.lg,
              padding: Spacing.padding.base,
              flexDirection: 'row',
            }}
            key={exercise.id}>
            <Image
              source={{uri: exercise.image}}
              style={{
                width: 100,
                height: 100,
                borderRadius: Spacing.borderRadius.base,
              }}
            />
            <View
              style={{
                marginLeft: Spacing.margin.base,
                justifyContent: 'space-between',
              }}>
              <AppText
                style={{
                  fontFamily: Font['poppins-semiBold'],
                }}>
                {exercise.name}
              </AppText>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <AppText
                  style={{
                    fontFamily: Font['poppins-regular'],
                    marginLeft: Spacing.margin.sm,
                  }}>
                  {exercise.time} minut / {exercise.set} serie
                </AppText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <AppText
                  style={{
                    fontFamily: Font['poppins-regular'],
                    marginLeft: Spacing.margin.sm,
                  }}></AppText>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Screen>
  );
};

export default PlanOverviewScreen;

const styles = StyleSheet.create({});
