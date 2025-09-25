import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Colors from '../assets/Colors/colors'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { useDispatch } from 'react-redux'
import { updateProfile } from '../redux/slices/userSlice'
import { useNavigation } from '@react-navigation/native'

const CompleteProfile = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const [contactNumber, setContactNumber] = useState('')
  const [addressLine1, setAddressLine1] = useState('')
  const [addressLine2, setAddressLine2] = useState('')
  const [city, setCity] = useState('')
  const [stateRegion, setStateRegion] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')

  const handleSave = () => {
    if (!contactNumber.trim() && !addressLine1.trim()) {
      Alert.alert('Nothing to save', 'Add at least a phone or address line 1')
      return
    }

    dispatch(updateProfile({
      contactNumber,
      address: {
        line1: addressLine1,
        line2: addressLine2,
        city,
        state: stateRegion,
        postalCode,
        country,
      },
    }))
    navigation.replace('BottomTab')
  }

  const handleSkip = () => {
    navigation.replace('BottomTab')
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Complete your profile</Text>
        <Text style={styles.subtitle}>Add contact and address details. You can skip for now.</Text>

        <View style={styles.inputContainer}>
          <FontAwesome6 name="phone" size={20} color={Colors.gray} />
          <TextInput 
            style={styles.input}
            placeholder='Contact Number'
            value={contactNumber}
            onChangeText={setContactNumber}
            placeholderTextColor="#666"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome6 name="location-dot" size={20} color={Colors.gray} />
          <TextInput 
            style={styles.input}
            placeholder='Address line 1'
            value={addressLine1}
            onChangeText={setAddressLine1}
            placeholderTextColor="#666"
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome6 name="location-dot" size={20} color={Colors.gray} />
          <TextInput 
            style={styles.input}
            placeholder='Address line 2 (optional)'
            value={addressLine2}
            onChangeText={setAddressLine2}
            placeholderTextColor="#666"
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome6 name="city" size={20} color={Colors.gray} />
          <TextInput 
            style={styles.input}
            placeholder='City'
            value={city}
            onChangeText={setCity}
            placeholderTextColor="#666"
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome6 name="map" size={20} color={Colors.gray} />
          <TextInput 
            style={styles.input}
            placeholder='State/Region'
            value={stateRegion}
            onChangeText={setStateRegion}
            placeholderTextColor="#666"
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome6 name="hashtag" size={20} color={Colors.gray} />
          <TextInput 
            style={styles.input}
            placeholder='Postal code'
            value={postalCode}
            onChangeText={setPostalCode}
            placeholderTextColor="#666"
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome6 name="globe" size={20} color={Colors.gray} />
          <TextInput 
            style={styles.input}
            placeholder='Country'
            value={country}
            onChangeText={setCountry}
            placeholderTextColor="#666"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save and continue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default CompleteProfile

const styles = StyleSheet.create({
  container:{
    flexGrow:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#F9F9F9',
    paddingVertical: 20,
  },
  card:{
    width:'90%',
    backgroundColor:'#fff',
    borderRadius:20,
    padding:20,
    elevation: 4,
  },
  title:{
    fontSize:24,
    fontFamily:'Sora-Bold',
    color: Colors.dark,
    textAlign:'center',
    marginBottom:6,
  },
  subtitle:{
    fontSize:13,
    fontFamily:'Sora-Regular',
    color:'#666',
    textAlign:'center',
    marginBottom:18,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 56,
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 14,
    backgroundColor: '#FAFAFA',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontFamily: 'Sora-Regular',
    fontSize: 16,
  },
  saveButton:{
    height:52,
    backgroundColor:Colors.primary,
    borderRadius:12,
    alignItems:'center',
    justifyContent:'center',
    marginTop: 8,
  },
  saveText:{
    color:'#111',
    fontFamily:'Sora-Bold',
    fontSize:16,
  },
  skipButton:{
    height:48,
    backgroundColor:'#EEE',
    borderRadius:12,
    alignItems:'center',
    justifyContent:'center',
    marginTop: 10,
  },
  skipText:{
    color:'#444',
    fontFamily:'Sora-SemiBold',
    fontSize:14,
  },
})


