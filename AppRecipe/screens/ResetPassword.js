import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import backgroundImage from './image/loginPicture.png';
import {auth} from '../firebase';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ResetPassword = () => {
  const navigation = useNavigation();

  function LoginScreen() {
    const [email, setEmail] = useState('');

    const handleUsernameChange = text => {
      setUsername(text);
    };

    const handleEmailChange = text => {
      setEmail(text);
    };

    const handleLogin = () => {
      // Handle login logic here
      axios
        .post('http://10.0.2.2:3000/api/password/reset', {email})
        .then(async user => {
          console.log(user.data.token);
          await storeData(user.data.token);
          navigation.navigate('Home');
        })
        .catch(e => console.log(e));
    };
    return (
      <View style={styles.container}>
        <Image source={backgroundImage} style={styles.logo} />
        <Text style={styles.title}>Reset hasła</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={handleEmailChange}
            value={email}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Zresetuj hasło</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}>
      <StatusBar barStyle="light-content" />
      {LoginScreen()}
    </View>
  );
};
export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 350,
    height: 350,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  form: {
    width: '80%',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
