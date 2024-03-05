import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {AddUser, UserCard, AddButton} from '../components';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useGetUsersQuery} from '../api/usersApi';
import {setUser} from '../reduxtoolkit/userSlice';
const HomeScreen = () => {
  const [isModalVisible, setShowModal] = useState(false);
  const {data, isLoading, isError} = useGetUsersQuery();
  const {userList} = useSelector(state => state.users);
  const dispatch = useDispatch();

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
});

export default HomeScreen;
