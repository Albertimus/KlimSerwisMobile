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

type Customer = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  address?: string;
};

function CustomersScreen(): React.JSX.Element {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/Customers`)
      .then(response => response.json())
      .then(data => {
        setCustomers(data);
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
          <Text style={styles.subtitle}>Customer database</Text>
          <Text style={styles.title}>Customers</Text>
          <Text style={styles.counter}>{customers.length} registered customers</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <View style={styles.list}>
            {customers.map(customer => (
              <View key={customer.id} style={styles.card}>
                <Text style={styles.cardTitle}>{customer.fullName}</Text>

                <View style={styles.infoBlock}>
                  <Text style={styles.label}>Email</Text>
                  <Text style={styles.value}>{customer.email}</Text>
                </View>

                <View style={styles.infoBlock}>
                  <Text style={styles.label}>Phone</Text>
                  <Text style={styles.value}>{customer.phoneNumber}</Text>
                </View>

                {customer.address ? (
                  <View style={styles.infoBlock}>
                    <Text style={styles.label}>Address</Text>
                    <Text style={styles.value}>{customer.address}</Text>
                  </View>
                ) : null}

                <View style={styles.footer}>
                  <Text style={styles.footerText}>Customer #{customer.id}</Text>
                </View>
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
  footer: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginTop: 8,
    paddingTop: 14,
  },
  footerText: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default CustomersScreen;