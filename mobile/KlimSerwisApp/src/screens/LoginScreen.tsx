import React, { useState } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Colors from '../constants/colors';
import PrimaryButton from '../components/PrimaryButton';
import AppInput from '../components/AppInput';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

function LoginScreen({ navigation }: Props): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.logo}>KS</Text>
          <Text style={styles.title}>KlimSerwis</Text>
          <Text style={styles.subtitle}>
            Mobile service management system
          </Text>
        </View>

        <View style={styles.card}>
          <AppInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <AppInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Pressable>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </Pressable>

          <PrimaryButton title="Sign In" onPress={handleSignIn} />
        </View>

        <Text style={styles.footerText}>
          KlimSerwis Mobile © 2026
        </Text>
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
  header: {
    alignItems: 'center',
    marginBottom: 36,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    color: '#FFFFFF',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 18,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
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
  forgotPassword: {
    color: Colors.primary,
    fontWeight: '600',
    textAlign: 'right',
    marginBottom: 20,
  },
  footerText: {
    textAlign: 'center',
    color: Colors.textSecondary,
    marginTop: 28,
    fontSize: 13,
  },
});

export default LoginScreen;