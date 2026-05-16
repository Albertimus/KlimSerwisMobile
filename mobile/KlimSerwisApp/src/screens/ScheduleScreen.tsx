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

type ServiceVisit = {
  id: number;
  customerName: string;
  technicianName: string;
  requestTitle: string;
  visitDate: string;
  status: string;
  notes?: string;
};

function ScheduleScreen(): React.JSX.Element {
  const [visits, setVisits] = useState<ServiceVisit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/ServiceVisits`)
      .then(response => response.json())
      .then(data => {
        setVisits(data);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.subtitle}>Service planning</Text>
          <Text style={styles.title}>Service schedule</Text>
          <Text style={styles.counter}>
            {visits.length} scheduled visits
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <View style={styles.list}>
            {visits.map(visit => (
              <View key={visit.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>
                    {visit.requestTitle}
                  </Text>

                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {visit.status}
                    </Text>
                  </View>
                </View>

                <View style={styles.infoBlock}>
                  <Text style={styles.label}>Customer</Text>
                  <Text style={styles.value}>
                    {visit.customerName}
                  </Text>
                </View>

                <View style={styles.infoBlock}>
                  <Text style={styles.label}>Technician</Text>
                  <Text style={styles.value}>
                    {visit.technicianName}
                  </Text>
                </View>

                <View style={styles.infoBlock}>
                  <Text style={styles.label}>Visit date</Text>
                  <Text style={styles.value}>
                    {new Date(visit.visitDate).toLocaleString()}
                  </Text>
                </View>

                {visit.notes ? (
                  <View style={styles.notesBox}>
                    <Text style={styles.notesText}>
                      {visit.notes}
                    </Text>
                  </View>
                ) : null}
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
    marginBottom: 16,
  },
  cardTitle: {
    color: Colors.textPrimary,
    fontSize: 19,
    fontWeight: '800',
    marginBottom: 10,
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
  notesBox: {
    marginTop: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    padding: 14,
  },
  notesText: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default ScheduleScreen;