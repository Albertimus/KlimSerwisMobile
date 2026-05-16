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

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type ServiceRequest = {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
};

function RequestsScreen(): React.JSX.Element {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProp>();

async function handleDeleteRequest(id: number) {
  Alert.alert(
    'Delete request',
    'Are you sure you want to delete this request?',
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
            const response = await fetch(
              `${API_URL}/ServiceRequests/${id}`,
              {
                method: 'DELETE',
              },
            );

            if (!response.ok) {
              throw new Error('Delete failed');
            }

            setRequests(current =>
              current.filter(request => request.id !== id),
            );
          } catch (error) {
            console.error(error);

            Alert.alert(
              'Error',
              'Unable to delete request.',
            );
          }
        },
      },
    ],
  );
}

useFocusEffect(
  useCallback(() => {
    setLoading(true);

    fetch(`${API_URL}/ServiceRequests`)
      .then(response => response.json())
      .then(data => {
        setRequests(data);
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
          <Text style={styles.subtitle}>Service management</Text>
          <Text style={styles.title}>Service requests</Text>
          <Text style={styles.counter}>{requests.length} active requests</Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('CreateRequest')}>
          <Text style={styles.addButtonText}>
            + Add request
          </Text>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
        <View style={styles.list}>
          {requests.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.85}
              onPress={() =>
                navigation.navigate('RequestDetails', {
                  requestId: item.id,
                })
              }>

              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.title}</Text>

                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.status}</Text>
                </View>
              </View>
              

              <Text
                numberOfLines={2}
                style={styles.description}>
                {item.description}
              </Text>

              <TouchableOpacity
                style={styles.editButton}
                activeOpacity={0.85}
                onPress={() =>
                  navigation.navigate('EditRequest', {
                    request: item,
                  })
                }>
                <Text style={styles.editButtonText}>
                  Edit
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                activeOpacity={0.85}
                onPress={() => handleDeleteRequest(item.id)}>
                <Text style={styles.deleteButtonText}>
                  Delete
                </Text>
              </TouchableOpacity>

              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  Request #{item.id}
                </Text>

                <Text style={styles.footerText}>
                  {new Date(item.createdAt).toLocaleDateString()}
                </Text>
              </View>

            </TouchableOpacity>
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
  cardHeader: {
    gap: 10,
    marginBottom: 12,
  },
  cardTitle: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: '800',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#DBEAFE',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  description: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginTop: 16,
    paddingTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
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
});

export default RequestsScreen;