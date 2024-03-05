import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import React from 'react';
import {useUserContext} from '../Context/UserContext';

const CustomButton = ({id, title, fillColor, border, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.button,
        backgroundColor: fillColor ? fillColor : '',
        borderColor: border ? border : '',
        borderWidth: 1,
      }}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomButton;
