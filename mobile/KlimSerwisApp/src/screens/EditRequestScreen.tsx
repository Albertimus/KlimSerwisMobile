import React, { useEffect, useState } from 'react';
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

type RequestStatus = {
  id: number;
  name: string;
};

type Props = NativeStackScreenProps<RootStackParamList, 'EditRequest'>;

function EditRequestScreen({ route, navigation }: Props): React.JSX.Element {
  const { request } = route.params;

  const [title, setTitle] = useState(request.title);
  const [description, setDescription] = useState(request.description);
  const [requestStatusId, setRequestStatusId] = useState(
    String(request.requestStatusId ?? 1),
  );

  useEffect(() => {
    fetch(`${API_URL}/RequestStatuses`)
      .then(response => response.json())
      .then(data => {
        setRequestStatuses(data);
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'Unable to load statuses.');
      });
  }, []);

  const [requestStatuses, setRequestStatuses] = useState<RequestStatus[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleUpdateRequest() {
    if (!title || !description) {
      Alert.alert('Validation', 'Please fill required fields.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/ServiceRequests/${request.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: request.id,
          title,
          description,
          requestStatusId: Number(requestStatusId),
        }),
      });

      if (!response.ok) {
        throw new Error('Request update failed');
      }

      Alert.alert('Success', 'Service request updated.');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Unable to update request.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Edit request</Text>

        <TextInput
          placeholder="Request title"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          placeholder="Request description"
          placeholderTextColor="#9CA3AF"
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <View style={styles.pickerBox}>
          <Text style={styles.pickerLabel}>Request status</Text>

          <Picker
            selectedValue={requestStatusId}
            onValueChange={value => setRequestStatusId(String(value))}>
            {requestStatuses.map(status => (
              <Picker.Item
                key={status.id}
                label={status.name}
                value={status.id}
              />
            ))}
          </Picker>
        </View>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.85}
          onPress={handleUpdateRequest}
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
    minHeight: 130,
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

export default EditRequestScreen;