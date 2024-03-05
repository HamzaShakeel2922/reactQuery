import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import Modal from 'react-native-modal';
import React, {useState} from 'react';
import uuid from 'react-native-uuid';
import {useCreateUserMutation} from '../api/usersApi';
const AddUser = ({isModalVisible, setShowModal}) => {
  const [createUser] = useCreateUserMutation();
  const handleCreateUser = async info => {
    await createUser(info);
  };
  const [userInfo, setUserInfo] = useState({
    id: uuid.v4(),
    name: '',
    username: '',
    company: {
      name: '',
    },
    email: '',
    phone: '',
  });

  return (
    <Modal
      isVisible={isModalVisible}
      onRequestClose={() => setShowModal(false)}
      onBackdropPress={() => setShowModal(false)}>
      <View style={styles.ModalStyles}>
        <Text style={{textAlign: 'center', fontSize: 25}}>ADD USER</Text>
        <View
          style={{
            gap: 10,
          }}>
          <TextInput
            placeholder="Enter name"
            placeholderTextColor="black"
            style={styles.inputBox}
            value={userInfo.name}
            onChangeText={newValue =>
              setUserInfo({...userInfo, ['name']: newValue})
            }
          />
          <TextInput
            placeholder="Enter username"
            placeholderTextColor="black"
            style={styles.inputBox}
            value={userInfo.username}
            onChangeText={newValue =>
              setUserInfo({...userInfo, ['username']: newValue})
            }
          />
          <TextInput
            style={styles.inputBox}
            placeholder="Enter company username"
            placeholderTextColor="black"
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
            placeholder="Enter email"
            placeholderTextColor="black"
            value={userInfo.email}
            onChangeText={newValue =>
              setUserInfo({...userInfo, ['email']: newValue})
            }
          />
          <TextInput
            inputMode="numeric"
            placeholder="Enter phone number"
            placeholderTextColor="black"
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
            title="Add"
            onPress={() => {
              handleCreateUser(userInfo);
              setShowModal(false);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    backgroundColor: '#e4e4e4',
    borderRadius: 10,
    color: 'black',
    paddingHorizontal: 10,
  },
  ModalStyles: {
    backgroundColor: '#d9d9d9',
    padding: 30,
    justifyContent: 'center',
    borderRadius: 30,
    gap: 20,
  },
});
export default AddUser;
