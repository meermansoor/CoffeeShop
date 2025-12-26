import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../Colors/colors';

const AddedToCartToast = ({ text1, text2 }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{text1}</Text>
      {text2 ? <Text style={styles.message}>{text2}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark,
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 6,
  },
  title: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Sora-SemiBold',
  },
  message: {
    color: Colors.secondary,
    fontSize: 14,
    fontFamily: 'Sora-Regular',
    marginTop: 2,
  },
});

export default AddedToCartToast;
