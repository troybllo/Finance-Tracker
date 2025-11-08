import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen.tsx';
import ExpenseScreen from '../screens/ExpenseScreen.tsx';
import { Text } from 'react-native';
import RegisterScreen from '../screens/RegisterScreen.tsx';
import LoginScreen from '../screens/LoginScreen.tsx';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#4A90E2',
          tabBarInactiveTintColor: '#A0AEC0',
          tabBarStyle: {
            backgroundColor: '#FFF',
            borderTopWidth: 1,
            borderTopColor: '#E2E8F0',
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <Text style={{ fontSize: 24, color }}>H</Text>
            ),
          }}
        />
        <Tab.Screen
          name="Expenses"
          component={ExpenseScreen}
          options={{
            tabBarLabel: 'Expenses',
            tabBarIcon: ({ color }) => (
              <Text style={{ fontSize: 24, color }}>$</Text>
            ),
          }}
        />
        <Tab.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            tabBarLabel: 'Register',
            tabBarIcon: ({ color }) => (
              <Text style={{ fontSize: 24, color }}>R</Text>
            ),
          }}
        />
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            tabBarLabel: 'Login',
            tabBarIcon: ({ color }) => (
              <Text style={{ fontSize: 24, color }}>L</Text>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
