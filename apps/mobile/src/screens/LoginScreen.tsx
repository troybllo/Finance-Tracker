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
import { authAPI } from '../services/api';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation<any>();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Clear previous errors
    setError('');

    // Check for empty fields FIRST
    if (!email.trim() || !password) {
      setError('Please enter email and password');
      return;
    }

    // Then validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      await authAPI.login({ email, password });

      navigation.navigate('Home');
    } catch (error) {
      setError(`Login failed: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpWithEmail = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Top Blue Section */}
          <View style={styles.topSection}>
            <Text style={styles.emailLabel}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="thomas@example.com"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.emailInput}
            />

            <Text style={styles.passwordLabel}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                autoCapitalize="none"
                secureTextEntry={!showPassword}
                style={styles.passwordInput}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Text style={styles.eyeIconText}>
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Error Message */}
            {error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {/* Remember Me & Forgot Password */}
            <View style={styles.optionsRow}>
              <TouchableOpacity
                style={styles.rememberMeContainer}
                onPress={() => setRememberMe(!rememberMe)}
              >
                <View
                  style={[
                    styles.checkbox,
                    rememberMe && styles.checkboxChecked,
                  ]}
                >
                  {rememberMe && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.rememberMeText}>Remember me</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Sign In Button */}
            <TouchableOpacity
              style={[
                styles.signInButton,
                loading && styles.signInButtonDisabled,
              ]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.signInButtonText}>
                {loading ? 'Signing in...' : 'Sign in'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Curved White Section */}
          <View style={styles.bottomSection}>
            <Text style={styles.dontHaveAccountText}>
              Don't have an account?
            </Text>

            {/* Social Login Buttons */}
            <View style={styles.socialButtonsRow}>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.facebookIcon}>f</Text>
                <Text style={styles.socialButtonText}>Facebook</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.googleIcon}>G</Text>
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              style={styles.signUpButton}
              onPress={handleSignUpWithEmail}
            >
              <Text style={styles.signUpButtonText}>Sign up with email</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3D4DE6',
  },
  scrollContent: {
    flexGrow: 1,
  },
  topSection: {
    backgroundColor: '#3D4DE6',
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  emailLabel: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  emailInput: {
    backgroundColor: 'rgba(93, 103, 230, 0.8)',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
  },
  passwordLabel: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(93, 103, 230, 0.8)',
    borderRadius: 8,
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: 'white',
  },
  eyeIcon: {
    padding: 16,
  },
  eyeIconText: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: 'rgba(93, 103, 230, 1)',
    borderColor: 'rgba(255, 255, 255, 0.9)',
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  rememberMeText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
  },
  forgotPasswordText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '500',
  },
  signInButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  signInButtonDisabled: {
    opacity: 0.6,
  },
  signInButtonText: {
    color: '#3D4DE6',
    fontSize: 16,
    fontWeight: '700',
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 100, 100, 0.15)',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
    marginBottom: 16,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomSection: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 30,
    alignItems: 'center',
  },
  dontHaveAccountText: {
    color: '#666',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  socialButtonsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
    width: '100%',
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 14,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  facebookIcon: {
    color: '#1877F2',
    fontSize: 20,
    fontWeight: '700',
  },
  googleIcon: {
    color: '#DB4437',
    fontSize: 18,
    fontWeight: '700',
  },
  socialButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
  },
  signUpButton: {
    backgroundColor: '#2C3A47',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});
