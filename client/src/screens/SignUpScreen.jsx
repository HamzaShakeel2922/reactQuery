import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

const firebaseAuth = auth();
const SignUpScreen = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const registerUser = () => {
    if (user.email === '' || user.password === '') {
      alert('Invalid Credentials');
      return;
    }
    firebaseAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(userCredentials => alert('User Created Successfully.'))
      .catch(err => alert(err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>sign up</Text>
      <View style={styles.inputContainer}>
        <TextInput
          inputMode="email"
          value={user.email}
          style={styles.input}
          placeholder="Enter email"
          placeholderTextColor="lightgrey"
          onChangeText={newValue => setUser({...user, ['email']: newValue})}
        />
        <TextInput
          value={user.password}
          secureTextEntry={true}
          style={styles.input}
          placeholder="Enter password"
          placeholderTextColor="lightgrey"
          onChangeText={newValue => setUser({...user, ['password']: newValue})}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={registerUser}>
          <View>
            <Text style={styles.buttonText}>Register</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: 'black',
    textTransform: 'uppercase',
    fontSize: 40,
    marginBottom: 15,
  },
  inputContainer: {
    // backgroundColor: 'red',
    width: '80%',
    gap: 10,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 10,
    fontSize: 15,
    color: 'black',
  },
  buttonContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'yellow',
    marginTop: 15,
  },
  button: {
    width: '100%',
    backgroundColor: '#6262ea',
    paddingVertical: 15,
    marginTop: 5,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
  },
});
