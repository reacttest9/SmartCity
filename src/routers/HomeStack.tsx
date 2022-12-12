import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Files
import Main from '../screens/Main';
import PaystackStack from '../screens/PaystackStack';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Main'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={'Main'} component={Main} />
      <Stack.Screen name={'PaystackStack'} component={PaystackStack} />
    </Stack.Navigator>
  );
};

export default HomeStack;
