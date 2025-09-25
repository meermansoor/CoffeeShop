import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../assets/Colors/colors'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/slices/userSlice'
import { signUpWithEmailPassword } from '../../firebase/authApi'

const SignupPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [contactNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match')
      return
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long')
      return
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address')
      return
    }

    try {
      const auth = await signUpWithEmailPassword({ email, password, name, contactNumber: '', address: { line1: '', line2: '', city: '', state: '', postalCode: '', country: '' } })
      dispatch(login({
        name: name,
        contactNumber: '',
        email: auth.email,
        address: { line1: '', line2: '', city: '', state: '', postalCode: '', country: '' },
        uid: auth.uid,
        idToken: auth.idToken,
        refreshToken: auth.refreshToken,
      }))
      navigation.replace('CompleteProfile')
    } catch (e) {
      Alert.alert('Signup failed', String(e?.message || e))
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.signupCard}>
        <Text style={styles.signupCardTitle}>Sign Up</Text>
        <Text style={styles.signupCardSubtitle}>Create your account</Text>
        
        <View style={styles.inputContainer}>
          <FontAwesome6 name="user" size={20} color={Colors.gray} />
          <TextInput 
            style={styles.input}
            placeholder='Full Name'
            value={name}
            onChangeText={setName}
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome6 name="envelope" size={20} color={Colors.gray} />
          <TextInput 
            style={styles.input}
            placeholder='Email'
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#666"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        

        <View style={styles.inputContainer}>
          <FontAwesome6 name="lock" size={20} color={Colors.gray} />
          <TextInput 
            style={styles.input}
            placeholder='Password'
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#666"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <FontAwesome6 
              name={showPassword ? "eye-slash" : "eye"} 
              size={20} 
              color={Colors.gray}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome6 name="lock" size={20} color={Colors.gray} />
          <TextInput 
            style={styles.input}
            placeholder='Confirm Password'
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholderTextColor="#666"
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <FontAwesome6 
              name={showConfirmPassword ? "eye-slash" : "eye"} 
              size={20} 
              color={Colors.gray}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Create Account</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default SignupPage

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#F9F9F9'
  },
  signupCard:{
    width:'90%',
    backgroundColor:'#fff',
    borderRadius:20,
    padding:24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  signupCardTitle:{
    fontSize:32,
    fontFamily:'Sora-Bold',
    textAlign:'center',
    marginBottom: 8,
    color: Colors.dark
  },
  signupCardSubtitle:{
    fontSize:16,
    fontFamily:'Sora-Regular',
    textAlign:'center',
    marginBottom: 30,
    color: Colors.gray
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 60,
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 20,
    backgroundColor: '#FAFAFA',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontFamily: 'Sora-Regular',
    fontSize: 16,
    color: '#666',
  },
  signupButton:{
    width:'100%',
    height:56,
    backgroundColor:Colors.primary,
    borderRadius:16,
    justifyContent:'center',
    alignItems:'center',
    marginTop: 10,
    elevation: 3,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.84,
  },
  signupButtonText:{
    fontSize:18,
    fontFamily:'Sora-Bold',
    color:'#fff',
    textAlign:'center'
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  loginText: {
    fontSize: 14,
    fontFamily: 'Sora-Regular',
    color: Colors.gray,
  },
  loginLink: {
    fontSize: 14,
    fontFamily: 'Sora-Bold',
    color: Colors.primary,
  }
})