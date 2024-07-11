import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import registerBackground from './image/register.png';
import {auth} from '../firebase';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import axios from 'axios';
const Register = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUsernameChange = text => {
    setUsername(text);
  };

  const handleEmailChange = text => {
    setEmail(text);
  };

  const handlePasswordChange = text => {
    setPassword(text);
  };

  const handleConfirmPasswordChange = text => {
    setConfirmPassword(text);
  };

  const handleRegister = () => {
    axios
      .post('http://10.0.2.2:3000/api/user/create', {username, email, password})
      .then(user => {
        console.log(user);
        navigation.navigate('Bmi', {userId: user.data.userId});
      })
      .catch(e => console.log(e));
  };

  return (
    <View style={styles.container}>
      <Image source={registerBackground} style={styles.logo} />
      <Text style={styles.title}>Zarejestruj się</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nazwa"
          onChangeText={handleUsernameChange}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={handleEmailChange}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Hasło"
          onChangeText={handlePasswordChange}
          value={password}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Powtórz hasło"
          onChangeText={handleConfirmPasswordChange}
          value={confirmPassword}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Zarejestruj się</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 400,
    height: 400,
  },
  title: {
    color: 'pink',
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    width: '80%',
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'pink',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
