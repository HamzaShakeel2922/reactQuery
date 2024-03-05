import {Text, TouchableOpacity, StyleSheet} from 'react-native';
const AddButton = ({setShowModal}) => {
  return (
    <TouchableOpacity
      onPress={() => setShowModal(true)}
      style={styles.buttonStyles}>
      <Text style={styles.titleStyles}>ADD USER</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyles: {
    padding: 20,
    alignSelf: 'center',
    borderRadius: 15,
    borderColor: 'blue',
    borderWidth: 1,
  },
  titleStyles: {
    fontSize: 25,
  },
});
export default AddButton;
