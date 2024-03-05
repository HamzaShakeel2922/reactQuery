import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import CustomButton from './CustomButton';
import Modal from 'react-native-modal';
import {useDeleteUserMutation, useUpdateUserMutation} from '../api/usersApi';
const UserCard = ({id, name, username, email, phone, company}) => {
  const [userInfo, setUserInfo] = useState({
    id,
    name,
    username,
    company,
    email,
    phone,
  });
  const [isModalVisible, setShowModal] = useState(false);
  const [deleteUser, {isLoading: deleteLoading, isError: deleteError}] =
    useDeleteUserMutation();
  const [updateUser, {isLoading: updateLoading, isError: errorUpdate}] =
    useUpdateUserMutation();
  const deleteHandler = async id => {
    await deleteUser(id);
  };
  const updateHandler = async newInfo => {
    await updateUser(newInfo);
  };

  if (deleteLoading || updateLoading) return <ActivityIndicator />;
  if (deleteError || errorUpdate) return <Tetx>Error occured...</Tetx>;

  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.imageContainer}>
          <Image
            src="https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png"
            style={styles.profileImg}
          />
          <Text>{name}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <View style={styles.description}>
            <Text>{username}</Text>
            <Text>{email}</Text>
            <Text>{phone}</Text>
            <Text>{company.name}</Text>
          </View>
          <View style={styles.ButtonsContainer}>
            <CustomButton
              title="Edit"
              fillColor={null}
              border="blue"
              id={id}
              onPress={() => setShowModal(true)}
            />
            <CustomButton
              title="Delete"
              fillColor="#eb7575"
              border={null}
              id={id}
              onPress={() => deleteHandler(id)}
            />
          </View>
        </View>
      </View>
      <Modal
        isVisible={isModalVisible}
        onRequestClose={() => setShowModal(false)}
        onBackdropPress={() => setShowModal(false)}>
        <View
          style={{
            backgroundColor: '#acacac',
            padding: 30,
            justifyContent: 'center',
            borderRadius: 30,
            gap: 20,
          }}>
          <Text style={{textAlign: 'center', fontSize: 25}}>EDIT USER</Text>
          <View
            style={{
              gap: 10,
            }}>
            <TextInput
              style={styles.inputBox}
              value={userInfo.name}
              onChangeText={newValue =>
                setUserInfo({...userInfo, ['name']: newValue})
              }
            />
            <TextInput
              style={styles.inputBox}
              value={userInfo.username}
              onChangeText={newValue =>
                setUserInfo({...userInfo, ['username']: newValue})
              }
            />
            <TextInput
              style={styles.inputBox}
              value={userInfo.company.name}
              onChangeText={newValue =>
                setUserInfo({
                  ...userInfo,
                  ['company']: {
                    name: newValue,
                  },
                })
              }
            />
            <TextInput
              style={styles.inputBox}
              value={userInfo.email}
              onChangeText={newValue =>
                setUserInfo({...userInfo, ['email']: newValue})
              }
            />
            <TextInput
              inputMode="numeric"
              style={styles.inputBox}
              value={userInfo.phone}
              onChangeText={newValue =>
                setUserInfo({...userInfo, ['phone']: newValue})
              }
            />
          </View>
          <View
            style={{
              alignSelf: 'center',
            }}>
            <Button
              title="Apply Changes"
              onPress={() => {
                updateHandler(userInfo);
                setShowModal(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  wrapper: {
    borderColor: '#eb7575',
    borderWidth: 1,
    padding: 20,
    borderRadius: 20,
    marginVertical: 10,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImg: {
    height: 50,
    width: 50,
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  description: {
    gap: 5,
  },
  ButtonsContainer: {
    gap: 8,
  },
  inputBox: {
    backgroundColor: '#e4e4e4',
    borderRadius: 10,
    color: 'black',
    paddingHorizontal: 10,
  },
});
