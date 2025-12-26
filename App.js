import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Toast from 'react-native-toast-message';

import OnboardingScreen from './src/Screens/OnboardingScreen';
import HomePage from './src/Screens/HomePage';
import Colors from './src/assets/Colors/colors';
import DetailScreen from './src/Screens/DetailScreen';
import coffeeStore from './src/redux/store';
import OrderScreen from './src/Screens/OrderScreen';
import NotificationScreen from './src/Screens/BottomTabs/NotificationScreen';
import FavourtiesScreen from './src/Screens/BottomTabs/FavouritesScreen';
import MapScreen from './src/Screens/MapScreen';
import LoginPage from './src/Screens/authScreens/loginPage';
import SignupPage from './src/Screens/authScreens/SignupPage';
import CompleteProfile from './src/Screens/CompleteProfile';

import Heart from './src/assets/images/svg/Heart.svg';
import Notification from './src/assets/images/svg/Notification.svg';
import HomeIcon from './src/assets/images/svg/HomeIcon';
import BagIcon from './src/assets/images/svg/BagIcon';
import AddedToCartToast from './src/assets/components/Toasts/AddToCartToast';
import { add } from 'react-native/types_generated/Libraries/Animated/AnimatedExports';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function BottomTabNav() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 99,
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 6,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          paddingTop: 24,
        },
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      <BottomTab.Screen
        name="HomePage"
        component={HomePage}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <HomeIcon
              width={24}
              height={24}
              stroke={focused ? Colors.primary : Colors.gray}
              fill={focused ? Colors.primary : 'white'}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="CartScreen"
        component={OrderScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <BagIcon
                width={24}
                height={24}
                fill={focused ? Colors.primary : 'gray'}
              />
            </View>
          ),
        }}
      />

      <BottomTab.Screen
        name="Favorites"
        component={FavourtiesScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Heart fill={focused ? Colors.primary : Colors.gray} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => <Notification />,
        }}
      />
    </BottomTab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={coffeeStore}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="BottomTab"
          navigationBar={false}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="BottomTab" component={BottomTabNav} />
          <Stack.Screen name="DetailScreen" component={DetailScreen} />
          <Stack.Screen name="Onboard" component={OnboardingScreen} />
          <Stack.Screen name="OrderScreen" component={OrderScreen} />
          <Stack.Screen name="MapScreen" component={MapScreen} />
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="SignupPage" component={SignupPage} />
          <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast
        config={{
          addedToCart: ({ text1, text2, ...rest }) => (
            <AddedToCartToast text1={text1} text2={text2} {...rest} />
          ),
        }}
      />
    </Provider>
  );
}

const styles = StyleSheet.create({
  activeIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#C67C4E', // shadow color matches fill
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8, // Android shadow
  },
  inactiveIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
