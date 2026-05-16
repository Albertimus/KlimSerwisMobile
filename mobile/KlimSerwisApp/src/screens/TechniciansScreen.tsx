import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Colors from '../constants/colors';
import { API_URL } from '../services/api';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Technician = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  specialization?: string;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function TechniciansScreen(): React.JSX.Element {
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<NavigationProp>();

  useFocusEffect(
    useCallback(() => {
      setLoading(true);

      fetch(`${API_URL}/Technicians`)
        .then(response => response.json())
        .then(data => {
          setTechnicians(data);
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, []),
  );

  async function handleDeleteTechnician(id: number) {
    Alert.alert(
      'Delete technician',
      'Are you sure you want to delete this technician?',
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
              const response = await fetch(`${API_URL}/Technicians/${id}`, {
                method: 'DELETE',
              });

              if (!response.ok) {
                throw new Error('Delete failed');
              }

              setTechnicians(current =>
                current.filter(technician => technician.id !== id),
              );
            } catch (error) {
              console.error(error);
              Alert.alert('Error', 'Unable to delete technician.');
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
          <Text style={styles.subtitle}>Service team</Text>
          <Text style={styles.title}>Technicians</Text>
          <Text style={styles.counter}>
            {technicians.length} technicians
          </Text>

          <TouchableOpacity
            style={styles.addButton}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('CreateTechnician')}>
            <Text style={styles.addButtonText}>+ Add technician</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <View style={styles.list}>
            {technicians.map(technician => (
              <View key={technician.id} style={styles.card}>
                <Text style={styles.cardTitle}>{technician.fullName}</Text>

                <View style={styles.infoBlock}>
                  <Text style={styles.label}>Email</Text>
                  <Text style={styles.value}>{technician.email}</Text>
                </View>

                <View style={styles.infoBlock}>
                  <Text style={styles.label}>Phone</Text>
                  <Text style={styles.value}>{technician.phoneNumber}</Text>
                </View>

                {technician.specialization ? (
                  <View style={styles.infoBlock}>
                    <Text style={styles.label}>Specialization</Text>
                    <Text style={styles.value}>
                      {technician.specialization}
                    </Text>
                  </View>
                ) : null}

                <TouchableOpacity
                  style={styles.editButton}
                  activeOpacity={0.85}
                  onPress={() =>
                    navigation.navigate('EditTechnician', {
                      technician,
                    })
                  }>
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  activeOpacity={0.85}
                  onPress={() => handleDeleteTechnician(technician.id)}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
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

export default TechniciansScreen;