import React, { useCallback, useState } from 'react';
import { 
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import Colors from '../constants/colors';
import { API_URL } from '../services/api';
import { useFocusEffect } from '@react-navigation/native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function HomeScreen(): React.JSX.Element {
  const [requestsCount, setRequestsCount] = useState(0);
  const [customersCount, setCustomersCount] = useState(0);
  const [visitsCount, setVisitsCount] = useState(0);
  const navigation = useNavigation<any>();

useFocusEffect(
  useCallback(() => {
    Promise.all([
      fetch(`${API_URL}/ServiceRequests`).then(response => response.json()),
      fetch(`${API_URL}/Customers`).then(response => response.json()),
      fetch(`${API_URL}/ServiceVisits`).then(response => response.json()),
    ])
      .then(([requests, customers, visits]) => {
        setRequestsCount(requests.length);
        setCustomersCount(customers.length);
        setVisitsCount(visits.length);
      })
      .catch(error => {
        console.error(error);
      });
  }, []),
);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome back</Text>
          <Text style={styles.title}>KlimSerwis Dashboard</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{requestsCount}</Text>
            <Text style={styles.statLabel}>Service requests</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>{visitsCount}</Text>
            <Text style={styles.statLabel}>Scheduled visits</Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{customersCount}</Text>
            <Text style={styles.statLabel}>Customers</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>{requestsCount + visitsCount}</Text>
            <Text style={styles.statLabel}>Active operations</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick actions</Text>

          <TouchableOpacity
            style={styles.actionCard}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('RequestStatuses')}>
            <Text style={styles.actionTitle}>Request statuses</Text>

            <Text style={styles.actionText}>
              Manage request status dictionary used by service requests.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('CreateRequest')}>
            <Text style={styles.actionTitle}>New service request</Text>
            <Text style={styles.actionText}>
              Create a new HVAC service or installation request.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Schedule')}>
            <Text style={styles.actionTitle}>Service schedule</Text>
            <Text style={styles.actionText}>
              Check upcoming technician visits and assigned tasks.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Customers')}>
            <Text style={styles.actionTitle}>Customers</Text>
            <Text style={styles.actionText}>
              Manage customers, contact details and service history.
            </Text>
          </TouchableOpacity>
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
  content: {
    padding: 24,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 28,
  },
  greeting: {
    fontSize: 15,
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 14,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 22,
    padding: 20,
    elevation: 3,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.primary,
  },
  statLabel: {
    marginTop: 6,
    color: Colors.textSecondary,
    fontSize: 14,
  },
  section: {
    gap: 14,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  actionCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  actionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  actionText: {
    fontSize: 14,
    lineHeight: 21,
    color: Colors.textSecondary,
  },
});

export default HomeScreen;