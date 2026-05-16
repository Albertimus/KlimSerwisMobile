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

type Props = NativeStackScreenProps<RootStackParamList, 'EditTechnician'>;

function EditTechnicianScreen({ route, navigation }: Props): React.JSX.Element {
  const { technician } = route.params;

  const [fullName, setFullName] = useState(technician.fullName);
  const [email, setEmail] = useState(technician.email);
  const [phoneNumber, setPhoneNumber] = useState(technician.phoneNumber);
  const [specialization, setSpecialization] = useState(
    technician.specialization ?? '',
  );
  const [loading, setLoading] = useState(false);

  async function handleUpdateTechnician() {
    if (!fullName || !email || !phoneNumber) {
      Alert.alert('Validation', 'Please fill required fields.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/Technicians/${technician.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: technician.id,
          fullName,
          email,
          phoneNumber,
          specialization,
        }),
      });

      if (!response.ok) {
        throw new Error('Technician update failed');
      }

      Alert.alert('Success', 'Technician updated.');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Unable to update technician.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Edit technician</Text>

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
          placeholder="Specialization"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          value={specialization}
          onChangeText={setSpecialization}
        />

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.85}
          onPress={handleUpdateTechnician}
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

export default EditTechnicianScreen;