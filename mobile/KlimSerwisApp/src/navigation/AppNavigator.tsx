import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import MainTabNavigator from './MainTabNavigator';
import RequestDetailsScreen from '../screens/RequestDetailsScreen';
import CreateRequestScreen from '../screens/CreateRequestScreen';
import CreateCustomerScreen from '../screens/CreateCustomerScreen';

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  RequestDetails: { requestId: number;};
  CreateRequest: undefined;
  CreateCustomer: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen name="RequestDetails" component={RequestDetailsScreen}
        options={{headerShown: true, title: 'Request details'}}/>
        <Stack.Screen name="CreateRequest" component={CreateRequestScreen}
        options={{headerShown: true, title: 'New request'}}/>
        <Stack.Screen name="CreateCustomer" component={CreateCustomerScreen}
        options={{headerShown: true, title: 'New customer'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;