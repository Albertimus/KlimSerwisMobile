import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useFocusEffect } from '@react-navigation/native';

import Colors from '../constants/colors';
import { API_URL } from '../services/api';

type Customer = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  address?: string;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function CustomersScreen(): React.JSX.Element {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProp>();
  
async function handleDeleteCustomer(id: number) {
  Alert.alert(
    'Delete customer',
    'Are you sure you want to delete this customer?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const response = await fetch(`${API_URL}/Customers/${id}`, {
              method: 'DELETE',
            });

            if (!response.ok) {
              throw new Error('Delete failed');
            }

            setCustomers(current =>
              current.filter(customer => customer.id !== id),
            );
          } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Unable to delete customer.');
          }
        },
      },
    ],
  );
}

useFocusEffect(
  useCallback(() => {
    setLoading(true);

    fetch(`${API_URL}/Customers`)
      .then(response => response.json())
      .then(data => {
        setCustomers(data);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []),
);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.subtitle}>Customer database</Text>
          <Text style={styles.title}>Customers</Text>
          <Text style={styles.counter}>{customers.length} registered customers</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('CreateCustomer')}>
          <Text style={styles.addButtonText}>
            + Add customer
          </Text>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <View style={styles.list}>
            {customers.map(customer => (
              <View key={customer.id} style={styles.card}>
                <Text style={styles.cardTitle}>{customer.fullName}</Text>

                <View style={styles.infoBlock}>
                  <Text style={styles.label}>Email</Text>
                  <Text style={styles.value}>{customer.email}</Text>
                </View>

                <View style={styles.infoBlock}>
                  <Text style={styles.label}>Phone</Text>
                  <Text style={styles.value}>{customer.phoneNumber}</Text>
                </View>

                {customer.address ? (
                  <View style={styles.infoBlock}>
                    <Text style={styles.label}>Address</Text>
                    <Text style={styles.value}>{customer.address}</Text>
                  </View>
                ) : null}

                <TouchableOpacity
                  style={styles.editButton}
                  activeOpacity={0.85}
                  onPress={() =>
                    navigation.navigate('EditCustomer', {
                      customer,
                    })
                  }>
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  activeOpacity={0.85}
                  onPress={() => handleDeleteCustomer(customer.id)}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                  <Text style={styles.footerText}>Customer #{customer.id}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 24,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: 15,
    marginBottom: 6,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 30,
    fontWeight: '800',
  },
  counter: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginTop: 8,
  },
  list: {
    gap: 14,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 3,
  },
  cardTitle: {
    color: Colors.textPrimary,
    fontSize: 19,
    fontWeight: '800',
    marginBottom: 16,
  },
  infoBlock: {
    marginBottom: 12,
  },
  label: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 3,
    textTransform: 'uppercase',
  },
  value: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginTop: 8,
    paddingTop: 14,
  },
  footerText: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 18,
  },

  addButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },

  deleteButton: {
  backgroundColor: '#FEE2E2',
  borderRadius: 14,
  paddingVertical: 12,
  alignItems: 'center',
  marginTop: 12,
},

deleteButtonText: {
  color: '#DC2626',
  fontSize: 14,
  fontWeight: '800',
},

editButton: {
  backgroundColor: '#DBEAFE',
  borderRadius: 14,
  paddingVertical: 12,
  alignItems: 'center',
  marginTop: 10,
},

editButtonText: {
  color: Colors.primary,
  fontSize: 14,
  fontWeight: '800',
},
});

export default CustomersScreen;