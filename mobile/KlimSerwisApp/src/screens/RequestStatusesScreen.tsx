import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import Colors from '../constants/colors';
import { API_URL } from '../services/api';

type RequestStatus = {
  id: number;
  name: string;
};

function RequestStatusesScreen(): React.JSX.Element {
  const [statuses, setStatuses] = useState<RequestStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [newStatusName, setNewStatusName] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');

  useFocusEffect(
    useCallback(() => {
      setLoading(true);

      fetch(`${API_URL}/RequestStatuses`)
        .then(response => response.json())
        .then(data => {
          setStatuses(data);
        })
        .catch(error => {
          console.error(error);
          Alert.alert('Error', 'Unable to load statuses.');
        })
        .finally(() => {
          setLoading(false);
        });
    }, []),
  );

  async function handleCreateStatus() {
    if (!newStatusName) {
      Alert.alert('Validation', 'Please enter status name.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/RequestStatuses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newStatusName,
        }),
      });

      if (!response.ok) {
        throw new Error('Create failed');
      }

      const createdStatus = await response.json();

      setStatuses(current => [...current, createdStatus]);
      setNewStatusName('');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Unable to create status.');
    }
  }

  async function handleUpdateStatus(id: number) {
    if (!editingName) {
      Alert.alert('Validation', 'Please enter status name.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/RequestStatuses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          name: editingName,
        }),
      });

      if (!response.ok) {
        throw new Error('Update failed');
      }

      const updatedStatus = await response.json();

      setStatuses(current =>
        current.map(status =>
          status.id === id ? updatedStatus : status,
        ),
      );

      setEditingId(null);
      setEditingName('');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Unable to update status.');
    }
  }

  async function handleDeleteStatus(id: number) {
    Alert.alert(
      'Delete status',
      'Are you sure you want to delete this status?',
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
              const response = await fetch(`${API_URL}/RequestStatuses/${id}`, {
                method: 'DELETE',
              });

              if (!response.ok) {
                throw new Error('Delete failed');
              }

              setStatuses(current =>
                current.filter(status => status.id !== id),
              );
            } catch (error) {
              console.error(error);
              Alert.alert(
                'Error',
                'Unable to delete status. It may be used by service requests.',
              );
            }
          },
        },
      ],
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.subtitle}>Dictionary</Text>
          <Text style={styles.title}>Request statuses</Text>
          <Text style={styles.counter}>{statuses.length} statuses</Text>
        </View>

        <View style={styles.createCard}>
          <TextInput
            placeholder="New status name"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            value={newStatusName}
            onChangeText={setNewStatusName}
          />

          <TouchableOpacity
            style={styles.addButton}
            activeOpacity={0.85}
            onPress={handleCreateStatus}>
            <Text style={styles.addButtonText}>+ Add status</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <View style={styles.list}>
            {statuses.map(status => (
              <View key={status.id} style={styles.card}>
                {editingId === status.id ? (
                  <>
                    <TextInput
                      placeholder="Status name"
                      placeholderTextColor="#9CA3AF"
                      style={styles.input}
                      value={editingName}
                      onChangeText={setEditingName}
                    />

                    <TouchableOpacity
                      style={styles.editButton}
                      activeOpacity={0.85}
                      onPress={() => handleUpdateStatus(status.id)}>
                      <Text style={styles.editButtonText}>Save</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.cancelButton}
                      activeOpacity={0.85}
                      onPress={() => {
                        setEditingId(null);
                        setEditingName('');
                      }}>
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Text style={styles.cardTitle}>{status.name}</Text>
                    <Text style={styles.footerText}>Status #{status.id}</Text>

                    <TouchableOpacity
                      style={styles.editButton}
                      activeOpacity={0.85}
                      onPress={() => {
                        setEditingId(status.id);
                        setEditingName(status.name);
                      }}>
                      <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.deleteButton}
                      activeOpacity={0.85}
                      onPress={() => handleDeleteStatus(status.id)}>
                      <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                  </>
                )}
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
  createCard: {
    backgroundColor: Colors.surface,
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 3,
    marginBottom: 18,
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
    marginBottom: 12,
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
    marginBottom: 6,
  },
  footerText: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
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
  cancelButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: '800',
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
});

export default RequestStatusesScreen;