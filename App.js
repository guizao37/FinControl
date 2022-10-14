import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './views/LoginScreen';
import HomeScreen from './views/HomeScreen';
import ForgotPassword from './views/ForgotPassword';
import RegisterScreen from './views/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen options={{ headerShown: false }} name="Esqueci a senha" component= {ForgotPassword}/>
        <Stack.Screen options={{headerShown: false}} name="Registrar" component={RegisterScreen}/>
       </Stack.Navigator>
    </NavigationContainer>
  );
}