import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Colors from '../constants/colors';
import { API_URL } from '../services/api';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'RequestDetails'>;

type ServiceRequestDetails = {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
};

function RequestDetailsScreen({ route }: Props): React.JSX.Element {
  const { requestId } = route.params;

  const [request, setRequest] = useState<ServiceRequestDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/ServiceRequests/${requestId}`)
      .then(response => response.json())
      .then(data => {
        setRequest(data);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [requestId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </SafeAreaView>
    );
  }

  if (!request) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.errorText}>Request not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>Request details</Text>
        <Text style={styles.title}>{request.title}</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{request.status}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{request.description}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Information</Text>
          <Text style={styles.info}>Request ID: #{request.id}</Text>
          <Text style={styles.info}>
            Created at: {new Date(request.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  center: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 24,
    paddingBottom: 100,
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
    marginBottom: 14,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#DBEAFE',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 20,
  },
  badgeText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 3,
    marginBottom: 14,
  },
  sectionTitle: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
  },
  description: {
    color: Colors.textSecondary,
    fontSize: 15,
    lineHeight: 23,
  },
  info: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginBottom: 6,
  },
  errorText: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
});

export default RequestDetailsScreen;