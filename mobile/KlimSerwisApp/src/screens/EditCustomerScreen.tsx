import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import Colors from '../constants/colors';
import { API_URL } from '../services/api';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'EditCustomer'>;

function EditCustomerScreen({ route, navigation }: Props): React.JSX.Element {
  const { customer } = route.params;

  const [fullName, setFullName] = useState(customer.fullName);
  const [email, setEmail] = useState(customer.email);
  const [phoneNumber, setPhoneNumber] = useState(customer.phoneNumber);
  const [address, setAddress] = useState(customer.address ?? '');
  const [loading, setLoading] = useState(false);

  async function handleUpdateCustomer() {
    if (!fullName || !email || !phoneNumber) {
      Alert.alert('Validation', 'Please fill required fields.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/Customers/${customer.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: customer.id,
          fullName,
          email,
          phoneNumber,
          address,
        }),
      });

      if (!response.ok) {
        throw new Error('Customer update failed');
      }

      Alert.alert('Success', 'Customer updated.');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Unable to update customer.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Edit customer</Text>

        <TextInput
          placeholder="Full name"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />

        <TextInput
          placeholder="Email"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Phone number"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />

        <TextInput
          placeholder="Address"
          placeholderTextColor="#9CA3AF"
          style={[styles.input, styles.textArea]}
          value={address}
          onChangeText={setAddress}
          multiline
        />

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.85}
          onPress={handleUpdateCustomer}
          disabled={loading}>
          <Text style={styles.buttonText}>
            {loading ? 'Saving...' : 'Save changes'}
          </Text>
        </TouchableOpacity>
      </View>
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
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 24,
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 15,
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  textArea: {
    minHeight: 110,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default EditCustomerScreen;