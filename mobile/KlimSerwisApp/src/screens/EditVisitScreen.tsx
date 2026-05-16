import React, { useState, useEffect,  } from 'react';
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
import { Picker } from '@react-native-picker/picker';
import Colors from '../constants/colors';
import { API_URL } from '../services/api';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Customer = {id: number; fullName: string; };

type Technician = {id: number; fullName: string; };

type ServiceRequest = {id: number; title: string; };

type Props = NativeStackScreenProps<RootStackParamList, 'EditVisit'>;

function EditVisitScreen({ route, navigation }: Props): React.JSX.Element {
  const { visit } = route.params;

  const [customerId, setCustomerId] = useState(String(visit.customerId));
  const [technicianId, setTechnicianId] = useState(String(visit.technicianId));
  const [serviceRequestId, setServiceRequestId] = useState(
    String(visit.serviceRequestId),
  );
  const [visitDate, setVisitDate] = useState(visit.visitDate);
  const [status, setStatus] = useState(visit.status);
  const [notes, setNotes] = useState(visit.notes ?? '');
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);

    useEffect(() => {
    Promise.all([
        fetch(`${API_URL}/Customers`).then(response => response.json()),
        fetch(`${API_URL}/Technicians`).then(response => response.json()),
        fetch(`${API_URL}/ServiceRequests`).then(response => response.json()),
    ])
        .then(([customersData, techniciansData, requestsData]) => {
        setCustomers(customersData);
        setTechnicians(techniciansData);
        setServiceRequests(requestsData);
        })
        .catch(error => {
        console.error(error);
        Alert.alert('Error', 'Unable to load form data.');
        });
    }, []);

  async function handleUpdateVisit() {
    if (!customerId || !technicianId || !serviceRequestId || !visitDate || !status) {
      Alert.alert('Validation', 'Please fill required fields.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/ServiceVisits/${visit.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: visit.id,
          customerId: Number(customerId),
          technicianId: Number(technicianId),
          serviceRequestId: Number(serviceRequestId),
          visitDate,
          status,
          notes,
        }),
      });

      if (!response.ok) {
        throw new Error('Visit update failed');
      }

      Alert.alert('Success', 'Service visit updated.');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Unable to update service visit. Check if IDs exist.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Edit service visit</Text>

        <View style={styles.pickerBox}>
        <Text style={styles.pickerLabel}>Customer</Text>
        <Picker
            selectedValue={customerId}
            onValueChange={value => setCustomerId(String(value))}>
            {customers.map(customer => (
            <Picker.Item
                key={customer.id}
                label={customer.fullName}
                value={customer.id}
            />
            ))}
        </Picker>
        </View>

        <View style={styles.pickerBox}>
        <Text style={styles.pickerLabel}>Technician</Text>
        <Picker
            selectedValue={technicianId}
            onValueChange={value => setTechnicianId(String(value))}>
            {technicians.map(technician => (
            <Picker.Item
                key={technician.id}
                label={technician.fullName}
                value={technician.id}
            />
            ))}
        </Picker>
        </View>

        <View style={styles.pickerBox}>
        <Text style={styles.pickerLabel}>Service request</Text>
        <Picker
            selectedValue={serviceRequestId}
            onValueChange={value => setServiceRequestId(String(value))}>
            {serviceRequests.map(request => (
            <Picker.Item
                key={request.id}
                label={request.title}
                value={request.id}
            />
            ))}
        </Picker>
        </View>

        <TextInput
          placeholder="Visit date"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          value={visitDate}
          onChangeText={setVisitDate}
        />

        <TextInput
          placeholder="Status"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          value={status}
          onChangeText={setStatus}
        />

        <TextInput
          placeholder="Notes"
          placeholderTextColor="#9CA3AF"
          style={[styles.input, styles.textArea]}
          value={notes}
          onChangeText={setNotes}
          multiline
        />

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.85}
          onPress={handleUpdateVisit}
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

  pickerBox: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
    overflow: 'hidden',
    },

    pickerLabel: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    paddingHorizontal: 18,
    paddingTop: 14,
    },
});

export default EditVisitScreen;