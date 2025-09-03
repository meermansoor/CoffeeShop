import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../assets/Colors/colors'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/slices/userSlice'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }

    if (email.includes('@') && password.length >= 6) {
      dispatch(login({
        name: 'Meer',
        contactNumber: '+923023456789',
        email: email,
        address: '123 Meer Street, Meer City'
      }))
      
      navigation.replace('BottomTab')
    } else {
      Alert.alert('Error', 'Please enter a valid email and password (min 6 characters)')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.loginCard}>
        <Text style={styles.loginCardTitle}>Login</Text>
        <Text style={styles.loginCardSubtitle}>Login to your account</Text>
        
        <View style={styles.inputContainer}>
          <FontAwesome6 name="user" size={20} color={Colors.gray} />
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

        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignupPage')}>
            <Text style={styles.signupLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default LoginPage

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#F9F9F9'
  },
  loginCard:{
    width:'90%',
    backgroundColor:'#fff',
    borderRadius:20,
    padding:18,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loginCardTitle:{
    fontSize:28,
    fontFamily:'Sora-Bold',
    textAlign:'center',
    marginBottom: 8,
    color: Colors.dark
  },
  loginCardSubtitle:{
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
  },
  forgotPassword: {
    fontSize: 14,
    fontFamily: 'Sora-Regular',
    color: Colors.primary,
    textAlign: 'right',
    marginBottom: 20,
  },
  loginButton:{
    width:'100%',
    height:50,
    backgroundColor:Colors.primary,
    borderRadius:12,
    justifyContent:'center',
    alignItems:'center',
    marginTop: 10,
    elevation: 2,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loginButtonText:{
    fontSize:16,
    fontFamily:'Sora-Bold',
    color:'#fff',
    textAlign:'center'
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signupText: {
    fontSize: 14,
    fontFamily: 'Sora-Regular',
    color: Colors.gray,
  },
  signupLink: {
    fontSize: 14,
    fontFamily: 'Sora-Bold',
    color: Colors.primary,
  }
})