import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, } from 'react-native';

import Colors from '../constants/colors';

function HomeScreen(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome back</Text>
          <Text style={styles.title}>KlimSerwis Dashboard</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Open requests</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Today visits</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick actions</Text>

          <View style={styles.actionCard}>
            <Text style={styles.actionTitle}>New service request</Text>
            <Text style={styles.actionText}>
              Create a new HVAC service or installation request.
            </Text>
          </View>

          <View style={styles.actionCard}>
            <Text style={styles.actionTitle}>Service schedule</Text>
            <Text style={styles.actionText}>
              Check upcoming technician visits and assigned tasks.
            </Text>
          </View>

          <View style={styles.actionCard}>
            <Text style={styles.actionTitle}>Customers</Text>
            <Text style={styles.actionText}>
              Manage customers, contact details and service history.
            </Text>
          </View>
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
    marginBottom: 30,
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