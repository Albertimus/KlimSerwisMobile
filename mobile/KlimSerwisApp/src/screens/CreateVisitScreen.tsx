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

import Colors from '../constants/colors';
import { API_URL } from '../services/api';

function CreateVisitScreen(): React.JSX.Element {
  const [customerId, setCustomerId] = useState('');
  const [technicianId, setTechnicianId] = useState('');
  const [serviceRequestId, setServiceRequestId] = useState('');
  const [visitDate, setVisitDate] = useState('2026-05-20T10:00:00');
  const [status, setStatus] = useState('Scheduled');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleCreateVisit() {
    if (!customerId || !technicianId || !serviceRequestId || !visitDate || !status) {
      Alert.alert('Validation', 'Please fill required fields.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/ServiceVisits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: Number(customerId),
          technicianId: Number(technicianId),
          serviceRequestId: Number(serviceRequestId),
          visitDate,
          status,
          notes,
        }),
      });

      if (!response.ok) {
        throw new Error('Visit create failed');
      }

      Alert.alert('Success', 'Service visit created.');

      setCustomerId('');
      setTechnicianId('');
      setServiceRequestId('');
      setVisitDate('2026-05-20T10:00:00');
      setStatus('Scheduled');
      setNotes('');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Unable to create service visit. Check if IDs exist.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>New service visit</Text>

        <TextInput
          placeholder="Customer ID"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          value={customerId}
          onChangeText={setCustomerId}
          keyboardType="numeric"
        />

        <TextInput
          placeholder="Technician ID"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          value={technicianId}
          onChangeText={setTechnicianId}
          keyboardType="numeric"
        />

        <TextInput
          placeholder="Service request ID"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          value={serviceRequestId}
          onChangeText={setServiceRequestId}
          keyboardType="numeric"
        />

        <TextInput
          placeholder="Visit date, e.g. 2026-05-20T10:00:00"
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
          onPress={handleCreateVisit}
          disabled={loading}>
          <Text style={styles.buttonText}>
            {loading ? 'Creating...' : 'Create visit'}
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

export default CreateVisitScreen;