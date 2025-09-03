import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Colors from '../assets/Colors/colors';

function OnboardingScreen() {
  const navigation = useNavigation();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  useEffect(() => {
    // Check if user is already logged in and navigate accordingly
    if (isLoggedIn) {
      navigation.replace('BottomTab');
    }
  }, [isLoggedIn, navigation]);

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigation.replace('BottomTab');
    } else {
      navigation.replace('LoginPage');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/background.png')}
        style={styles.image}
      />
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>
            Fall in Love with Coffee in Blissful Delight!
          </Text>
          <Text style={styles.subTitle}>
            Welcome to our cozy coffee corner, where every cup is a delightful for
            you.
          </Text>
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
}

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  textContainer:{
    flexDirection:'column',
    alignItems:'center',
    marginHorizontal:15,
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0
  },
  image: {
    width: '100%',
    height: '65%',
    zIndex: 0,
  },
  titleText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 32,
    fontFamily: 'Sora-Bold',
  },
  subTitle: {
    color: '#A2A2A2',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Sora-Regular',
    marginVertical:15
  },
  button:{
    width:'100%',
    height:56,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
    backgroundColor: Colors.primary,
    padding:10,
    marginTop:15
  },
  buttonText:{
    color:Colors.background,
    fontFamily:'Sora-Bold',
    fontSize:16,
    textAlign:'center'
  }
});
