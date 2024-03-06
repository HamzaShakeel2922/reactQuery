import {StyleSheet, Text, TouchableOpacity, View, Button} from 'react-native';
import {StackActions} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import {
  GoogleSigninButton,
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useDispatch} from 'react-redux';
import {setLoginMethod} from '../reduxtoolkit/authSlice';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const firebaseAuth = auth();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const unSubscribe = firebaseAuth.onAuthStateChanged(response => {
      if (response) {
        navigation.dispatch(
          StackActions.replace('Home', {
            email: response.email,
          }),
        );
      }
    });
    return unSubscribe;
  }, []);

  async function onGoogleButtonPress() {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  }
  const handleSignIn = () => {
    if (user.email === '' || user.password === '') {
      alert('Invalid Credentials');
      return;
    }
    firebaseAuth
      .signInWithEmailAndPassword(user.email, user.password)
      .then(response => {
        alert(`Logged in with email : ${response.user.email}`);
        dispatch(setLoginMethod('firebase'));
      })
      .catch(err => alert(err));
  };
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '283938031281-6vgl4b3uommcvk8rnggfvlb9hg8qpu6b.apps.googleusercontent.com',
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>login</Text>
      <View style={styles.inputContainer}>
        <TextInput
          inputMode="email"
          style={styles.input}
          placeholder="Enter email"
          placeholderTextColor="lightgrey"
          onChangeText={newValue => setUser({...user, ['email']: newValue})}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Enter password"
          placeholderTextColor="lightgrey"
          onChangeText={newValue => setUser({...user, ['password']: newValue})}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <View>
            <Text style={styles.buttonText}>Login</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignUp')}>
          <View>
            <Text style={styles.buttonText}>Register</Text>
          </View>
        </TouchableOpacity>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Icon}
          color={GoogleSigninButton.Color.Dark}
          onPress={() =>
            onGoogleButtonPress()
              .then(() => dispatch(setLoginMethod('google')))
              .catch(err => console.log(err))
          }
        />
        {/* <Button
          title="Google Sign-In"
          onPress={() =>
            onGoogleButtonPress()
              .then(() => console.log('Signed in with Google!'))
              .catch(err => console.log(err))
          }
        /> */}
      </View>
    </View>
  );
};

export default LoginScreen;

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
