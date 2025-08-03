import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';

import OnboardingScreen from './src/Screens/OnboardingScreen';
import HomePage from './src/Screens/HomePage';
import Colors from './src/assets/Colors/colors';
import DetailScreen from './src/Screens/DetailScreen';
import coffeeStore from './src/redux/store';
import OrderScreen from './src/Screens/OrderScreen';

import Home from './src/assets/images/svg/Home.svg';
import HomeIcon from './src/assets/images/svg/HomeIcon';
import CartScreen from './src/Screens/BottomTabs/CartScreen';
import BagIcon from './src/assets/images/svg/BagIcon';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function BottomTabNav() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 99,
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 6,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          padding: 24,
        },
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      <BottomTab.Screen
        name="HomePage"
        component={HomePage}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size, focused, fill }) => (
            <HomeIcon
              width={24}
              height={24}
              fill={focused ? Colors.primary : 'white'}
              stroke={focused?Colors.primary: Colors.gray}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size, focused, fill }) => (
            <BagIcon
              width={24}
              height={24}
              fill={focused ? Colors.primary : 'white'}
              stroke={focused?Colors.primary: Colors.gray}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default function App() {
  console.log('App component is rendering');

  return (
    <Provider store={coffeeStore}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Onboard"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="BottomTab" component={BottomTabNav} />
          <Stack.Screen name="DetailScr" component={DetailScreen} />
          <Stack.Screen name="Onboard" component={OnboardingScreen} />
          <Stack.Screen name="OrderScreen" component={OrderScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
