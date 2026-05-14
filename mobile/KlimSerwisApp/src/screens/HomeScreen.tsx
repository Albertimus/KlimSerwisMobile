import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

function HomeScreen(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#0F172A',
    fontSize: 28,
    fontWeight: '700',
  },
});

export default HomeScreen;