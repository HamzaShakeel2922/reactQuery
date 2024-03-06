import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Button,
} from 'react-native';
import {AddUser, UserCard, AddButton} from '../components';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useGetUsersQuery} from '../api/usersApi';
import {setUser} from '../reduxtoolkit/userSlice';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const HomeScreen = ({route, navigation}) => {
  const [isModalVisible, setShowModal] = useState(false);
  const {data, isLoading, isError} = useGetUsersQuery();
  const {email} = route.params;
  const {userList} = useSelector(state => state.users);
  const dispatch = useDispatch();
  const {loginMethod} = useSelector(state => state.auth);

  const handleSignOut = () => {
    const signOutPromises = [];
    signOutPromises.push(auth().signOut());

    if (loginMethod === 'google') {
      signOutPromises.push(GoogleSignin.signOut());
    }

    Promise.all(signOutPromises)
      .then(() => {
        navigation.replace('Login');
        alert('Sign out successful');
      })
      .catch(error => {
        console.error('Error signing out:', error);
        alert('Error signing out');
      });
  };

  useEffect(() => {
    dispatch(setUser(data));
  }, [data]);

  if (isLoading)
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator />
      </View>
    );
  if (isError)
    return (
      <View style={styles.errorScreen}>
        <Text style={styles.errorMessageStyles}>No Records.</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <AddButton setShowModal={setShowModal} />
      <View style={styles.signOutContainer}>
        <Button title="Sign out" onPress={handleSignOut} />
        <Text style={styles.emailText}>Your Email : {email}</Text>
      </View>
      <FlatList
        data={userList}
        style={styles.listStyles}
        renderItem={({item}) => <UserCard key={item.id} {...item} />}
      />
      <View>
        <AddUser isModalVisible={isModalVisible} setShowModal={setShowModal} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    gap: 20,
    flex: 1,
    backgroundColor: 'black',
  },
  listStyles: {
    paddingHorizontal: 10,
  },
  errorScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessageStyles: {
    fontSize: 30,
    color: 'red',
  },
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOutContainer: {
    alignSelf: 'center',
    gap: 10,
  },
  emailText: {
    fontSize: 20,
  },
});

export default HomeScreen;
