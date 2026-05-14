import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Colors from '../constants/colors';
import PrimaryButton from '../components/PrimaryButton';

function LoginScreen(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          KlimSerwis
        </Text>

        <Text style={styles.subtitle}>
          Mobile service management system
        </Text>

        <View style={styles.card}>
          <PrimaryButton
            title="Sign In"
            onPress={() => {}}
          />
        </View>
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
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
  },

  subtitle: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
  },

  card: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 24,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,

    elevation: 4,
  },
});

export default LoginScreen;