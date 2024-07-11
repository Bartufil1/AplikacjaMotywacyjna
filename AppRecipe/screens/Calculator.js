import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const BMICalculator = ({route}) => {
  const {userId} = route.params;
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBMI] = useState(null);
  const [activityMode, setActivityMode] = useState(null);
  const [gender, setGender] = useState(null);
  const [sedentaryButtonColor, setSedentaryButtonColor] = useState('#DDDDDD');
  const [standingButtonColor, setStandingButtonColor] = useState('#DDDDDD');
  const [mixedButtonColor, setMixedButtonColor] = useState('#DDDDDD');
  const [maleButtonColor, setMaleButtonColor] = useState('#DDDDDD');
  const [femaleButtonColor, setFemaleButtonColor] = useState('#DDDDDD');

  const navigation = useNavigation();

  const sendData = () => {
    axios
      .post('http://10.0.2.2:3000/api/bmi/create', {
        weight,
        height,
        bmi,
        activityMode,
        sex: gender,
        userId,
      })
      .then(async user => {
        console.log(user.data.token);
        navigation.navigate('Login');
      })
      .catch(e => console.log(e));
  };

  const calculateBMI = () => {
    const weightFloat = parseFloat(weight);
    const heightFloat = parseFloat(height) * 0.01;

    if (!isNaN(weightFloat) && !isNaN(heightFloat) && heightFloat > 0) {
      const bmiValue = weightFloat / (heightFloat * heightFloat);
      console.log(bmiValue);
      setBMI(bmiValue.toFixed(2));
    } else {
      setBMI(null);
    }
  };

  const setActivityModeAndCalculateBMI = mode => {
    setActivityMode(mode);
  };

  const setGenderAndCalculateBMI = selectedGender => {
    setGender(selectedGender);
  };

  const setButtonColor = buttonType => {
    switch (buttonType) {
      case 'Sedentary':
        setSedentaryButtonColor('#00FF00'); // zmień na dowolny kolor
        setStandingButtonColor('#DDDDDD');
        setMixedButtonColor('#DDDDDD');
        break;
      case 'Standing':
        setSedentaryButtonColor('#DDDDDD');
        setStandingButtonColor('#00FF00'); // zmień na dowolny kolor
        setMixedButtonColor('#DDDDDD');
        break;
      case 'Mixed':
        setSedentaryButtonColor('#DDDDDD');
        setStandingButtonColor('#DDDDDD');
        setMixedButtonColor('#00FF00'); // zmień na dowolny kolor
        break;
      case 'Male':
        setMaleButtonColor('#00FF00'); // zmień na dowolny kolor
        setFemaleButtonColor('#DDDDDD');
        break;
      case 'Female':
        setMaleButtonColor('#DDDDDD');
        setFemaleButtonColor('#00FF00'); // zmień na dowolny kolor
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // Wywołaj calculateBMI po każdej zmianie wagi i wzrostu
    calculateBMI();
  }, [weight, height]);

  return (
    <View style={styles.container}>
      <Image
        source={require('./image/bmiImage.png')} // Zmień na ścieżkę do twojego obrazka
        style={styles.image}
      />
      <Text style={styles.label}>Waga (kg):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={weight}
        onChangeText={text => setWeight(text)}
      />

      <Text style={styles.label}>Wzrost (cm):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={height}
        onChangeText={text => setHeight(text)}
      />
      <Text style={styles.label}>Styl pracy:</Text>
      <View style={styles.activityButtons}>
        <TouchableOpacity
          style={[
            styles.activityButton,
            {backgroundColor: sedentaryButtonColor},
          ]}
          onPress={() => {
            setActivityModeAndCalculateBMI('Sedentary');
            setButtonColor('Sedentary');
          }}>
          <Text>Siedzący</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.activityButton,
            {backgroundColor: standingButtonColor},
          ]}
          onPress={() => {
            setActivityModeAndCalculateBMI('Standing');
            setButtonColor('Standing');
          }}>
          <Text>Stojący</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.activityButton, {backgroundColor: mixedButtonColor}]}
          onPress={() => {
            setActivityModeAndCalculateBMI('Mixed');
            setButtonColor('Mixed');
          }}>
          <Text>Mieszany</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>Płeć:</Text>
      <View style={styles.genderButtons}>
        <TouchableOpacity
          style={[styles.genderButton, {backgroundColor: maleButtonColor}]}
          onPress={() => {
            setGenderAndCalculateBMI('Male');
            setButtonColor('Male');
          }}>
          <Text>Mężczyzna</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderButton, {backgroundColor: femaleButtonColor}]}
          onPress={() => {
            setGenderAndCalculateBMI('Female');
            setButtonColor('Female');
          }}>
          <Text>Kobieta</Text>
        </TouchableOpacity>
      </View>

      {bmi !== null && (
        <View>
          <Text style={styles.result}>BMI: {bmi}</Text>
          <Text style={styles.result}>
            Status:{' '}
            {bmi < 18.5 ? 'Niedowaga' : bmi < 25 ? 'Poprawny' : 'Nadwaga'}
          </Text>
        </View>
      )}

      <TouchableOpacity style={styles.nextButton} onPress={() => sendData()}>
        <Text style={styles.nextButtonText}>Dalej</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginVertical: 5,
    color: 'white', // Dodany biały kolor tekstu
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: 'white', // Dodany biały kolor tekstu
  },
  activityButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  activityButton: {
    flex: 0.3,
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
    backgroundColor: '#FFA500',
  },
  genderButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
  },
  genderButton: {
    flex: 0.3,
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: '#FFA500',
  },
  result: {
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 5,
    color: 'white', // Dodany biały kolor tekstu
  },
  nextButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default BMICalculator;
