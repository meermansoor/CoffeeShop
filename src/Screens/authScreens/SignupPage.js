import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux';

const SignupPage = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text>SignupPage</Text>
    </View>
  )
}

export default SignupPage

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})