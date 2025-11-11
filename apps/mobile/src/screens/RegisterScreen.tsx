import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import useAuthStore from '../store/authStore';

export default function RegisterScreen() {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation<any>();
  const register = useAuthStore(state => state.register);
  const loading = useAuthStore(state => state.loading);

  const handleRegister = async () => {
    // Clear previous errors
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Validate all fields before making API call
    if (!name.trim()) {
      setError('Please enter your full name');
      return;
    }

    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }

    if (!password) {
      setError('Please enter a password');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await register(name, email, password);
      navigation.navigate('Home');
    } catch (error: any) {
      setError(
        error.response?.data?.error || 'Registration failed. Please try again.',
      );
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <Text style={{ fontSize: 14, color: 'blue', fontWeight: 600 }}>
              REGISTRATION
            </Text>
            <Text style={{ fontSize: 24, fontWeight: 600 }}>
              Create an account
            </Text>
          </View>
          <View style={styles.main}>
            <View style={styles.fullName}>
              <Text style={{ color: 'gray' }}>Full name</Text>
              <TextInput
                value={name}
                placeholder="Full Name"
                autoCapitalize="none"
                onChangeText={setName}
                style={styles.input}
              />
            </View>
            <View style={styles.email}>
              <Text style={{ color: 'gray' }}>Email</Text>
              <TextInput
                value={email}
                placeholder="Email"
                autoCapitalize="none"
                onChangeText={setEmail}
                keyboardType="email-address"
                style={styles.input}
              />
            </View>
            <View style={styles.password}>
              <Text style={{ color: 'gray' }}>Password</Text>
              <TextInput
                value={password}
                placeholder="Enter Password"
                secureTextEntry
                onChangeText={setPassword}
                autoCapitalize="none"
                style={styles.input}
              />
            </View>
            <View style={styles.retypePass}>
              <Text style={{ color: 'gray' }}>Retype Password</Text>
              <TextInput
                value={confirmPassword}
                placeholder="Retype Password"
                secureTextEntry
                onChangeText={setConfirmPassword}
                autoCapitalize="none"
                style={styles.input}
              />
            </View>
            {error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}
            <View style={styles.termsContainer}>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setAcceptedTerms(!acceptedTerms)}
              >
                <View
                  style={[
                    styles.checkbox,
                    acceptedTerms && styles.checkboxChecked,
                  ]}
                >
                  {acceptedTerms && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.termsText}>
                  I accept the{' '}
                  <Text style={styles.linkText}>Terms and Conditions</Text> as
                  well as the{' '}
                  <Text style={styles.linkText}>Privacy Policy</Text> of this
                  application
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[
                styles.registerButton,
                !acceptedTerms && styles.registerButtonDisabled,
              ]}
              disabled={!acceptedTerms}
              onPress={handleRegister}
            >
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>
            <View>
              <Text style={styles.loginPrompt}>Already have an account?</Text>
              <TouchableOpacity style={styles.outlineButton}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  main: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
  },
  fullName: { gap: 2 },
  email: { gap: 2 },
  password: { gap: 2 },
  retypePass: { gap: 2 },
  termsContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  linkText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  registerButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  registerButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  loginPrompt: {
    textAlign: 'center',
    marginBottom: 8,
    color: '#666',
  },
  outlineButton: {
    backgroundColor: '#003D82',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  errorContainer: {
    backgroundColor: '#FEE',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#F44',
    marginVertical: 8,
  },
  errorText: {
    color: '#C33',
    fontSize: 14,
    fontWeight: '600',
  },
});
