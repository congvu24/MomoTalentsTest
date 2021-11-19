import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '@/screen/Login';
import PhotosScreen from '@/screen/Photos';
import PhotoDetail from '@/screen/PhotoDetail';

const Stack = createNativeStackNavigator();

const ApplicationStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Photo" component={PhotosScreen} />
        <Stack.Screen name="Detail" component={PhotoDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationStack;
