import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { House, ClipboardList, Users, User, } from 'lucide-react-native';

import HomeScreen from '../screens/HomeScreen';
import RequestsScreen from '../screens/RequestScreen';
import CustomersScreen from '../screens/CustomerScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import Colors from '../constants/colors';


export type MainTabParamList = {
  Home: undefined;
  Requests: undefined;
  Customers: undefined;
  Schedule: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

function renderTabIcon(routeName: keyof MainTabParamList, color: string, size: number) {
  switch (routeName) {
    case 'Home':
      return <House color={color} size={size} />;
    case 'Requests':
      return <ClipboardList color={color} size={size} />;
    case 'Customers':
      return <Users color={color} size={size} />;
    case 'Schedule':
      return <ClipboardList color={color} size={size} />;
    default:
      return null;
  }
}

function MainTabNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          height: 64,
          paddingBottom: 10,
          paddingTop: 8,
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarIcon: ({ color, size }) => renderTabIcon(route.name, color, size),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Requests" component={RequestsScreen} />
      <Tab.Screen name="Customers" component={CustomersScreen} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} />
    </Tab.Navigator>
  );
}
export default MainTabNavigator;