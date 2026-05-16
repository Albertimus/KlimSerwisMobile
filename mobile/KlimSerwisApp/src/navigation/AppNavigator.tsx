import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import MainTabNavigator from './MainTabNavigator';
import RequestDetailsScreen from '../screens/RequestDetailsScreen';
import CreateRequestScreen from '../screens/CreateRequestScreen';
import CreateCustomerScreen from '../screens/CreateCustomerScreen';
import EditCustomerScreen from '../screens/EditCustomerScreen';
import EditRequestScreen from '../screens/EditRequestScreen';
import CreateVisitScreen from '../screens/CreateVisitScreen';
import EditVisitScreen from '../screens/EditVisitScreen';
import TechniciansScreen from '../screens/TechniciansScreen';
import CreateTechnicianScreen from '../screens/CreateTechnicianScreen';
import EditTechnicianScreen from '../screens/EditTechnicianScreen';


export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  RequestDetails: { requestId: number;};
  CreateRequest: undefined;
  CreateCustomer: undefined;
  EditCustomer: {
    customer:{
      id: number;
      fullName: string;
      email: string;
      phoneNumber: string;
      address?: string;
    };
  };
  EditRequest: {
    request: {
      id: number;
      title: string;
      description: string;
      requestStatusId?: number;
    };
  };
  EditVisit: {
    visit: {
      id: number;
      customerId: number;
      technicianId: number;
      serviceRequestId: number;
      visitDate: string;
      status: string;
      notes?: string;
    };
  };
  CreateVisit: undefined;
  CreateTechnician: undefined;
  EditTechnician: {
    technician: {
      id: number;
      fullName: string;
      email: string;
      phoneNumber: string;
      specialization?: string;
    };
  };
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
        <Stack.Screen name="EditCustomer" component={EditCustomerScreen}
        options={{headerShown: true, title: 'Edit customer'}}/>
        <Stack.Screen name="EditRequest" component={EditRequestScreen}
        options={{headerShown: true, title: 'Edit request'}}/>
        <Stack.Screen name="CreateVisit" component={CreateVisitScreen}
        options={{headerShown: true, title: 'New visit'}}/>
        <Stack.Screen name="EditVisit" component={EditVisitScreen}
        options={{headerShown: true, title: 'Edit Visit'}}/>
        <Stack.Screen name="CreateTechnician" component={CreateTechnicianScreen}
        options={{headerShown: true, title: 'New technician'}}/>
        <Stack.Screen name="EditTechnician" component={EditTechnicianScreen}
        options={{headerShown: true, title: 'Edit technician'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;