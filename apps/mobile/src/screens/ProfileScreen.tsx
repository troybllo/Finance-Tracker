import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import useAuthStore from '../store/authStore';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from '../navigation/AppNavigator';

export default function ProfileScreen() {
  const total = 12521.1;
  const budget = 20000.0;
  const subscription = 8221.0;
  const friendFamily = 4300;

  const subscriptionPercent = (subscription / budget) * 100;
  const friendFamilyPercent = (friendFamily / budget) * 100;
  const remainingPercent = 100 - subscriptionPercent - friendFamilyPercent;
  const logout = useAuthStore(state => state.logout);
  const user = useAuthStore(state => state.user);

  const handleLogout = async (): Promise<Element> => {
    try {
      logout();
      return (
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
      );
    } catch (error) {
      throw error;
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <Text style={{ fontSize: 24 }}>My Account</Text>
          </View>
          <View style={styles.profileContainer}>
            <View style={styles.profileCircle}>
              <Text style={styles.profileInitial}>
                {user?.name[0]?.toUpperCase()}
              </Text>
            </View>
          </View>

          <View style={styles.overview}>
            <Text style={styles.overviewHeader}>Spending Overview</Text>

            <View style={styles.amountRow}>
              <Text style={styles.totalAmount}>${total.toLocaleString()}</Text>
              <Text style={styles.budget}>From ${budget.toLocaleString()}</Text>
            </View>

            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressSegment,
                  styles.subscriptionBar,
                  { width: `${subscriptionPercent}%` },
                ]}
              />
              <View
                style={[
                  styles.progressSegment,
                  styles.friendFamilyBar,
                  { width: `${friendFamilyPercent}%` },
                ]}
              />
              <View
                style={[
                  styles.progressSegment,
                  styles.remainingBar,
                  { width: `${remainingPercent}%` },
                ]}
              />
            </View>

            <View style={styles.categoriesContainer}>
              <View style={styles.categoryRow}>
                <View style={styles.categoryLabel}>
                  <View style={[styles.dot, styles.subscriptionDot]} />
                  <Text style={styles.categoryText}>Subscription</Text>
                </View>
                <Text style={styles.categoryAmount}>
                  ${subscription.toLocaleString()}
                </Text>
              </View>

              <View style={styles.categoryRow}>
                <View style={styles.categoryLabel}>
                  <View style={[styles.dot, styles.friendFamilyDot]} />
                  <Text style={styles.categoryText}>Friend & Family</Text>
                </View>
                <Text style={styles.categoryAmount}>
                  ${friendFamily.toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.overview}>
            <View>
              <TouchableOpacity>
                <Text style={{ fontWeight: 600, fontSize: 18 }}>
                  My Account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.overview}>
            <View>
              <TouchableOpacity>
                <Text style={{ fontWeight: 600, fontSize: 18 }}>
                  Transaction History
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.overview}>
            <View>
              <TouchableOpacity>
                <Text style={{ fontWeight: 600, fontSize: 18 }}>
                  Security Settings
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.overview}>
            <View>
              <TouchableOpacity onPress={handleLogout}>
                <Text style={{ fontWeight: 600, fontSize: 18, color: 'red' }}>
                  Log out
                </Text>
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
  profileContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  overview: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  overviewHeader: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },

  amountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
    gap: 8,
  },
  totalAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
  },
  budget: {
    fontSize: 14,
    color: '#999',
  },
  progressBarContainer: {
    height: 8,
    borderRadius: 4,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#E0E0E0',
  },
  progressSegment: {
    height: '100%',
  },
  subscriptionBar: {
    backgroundColor: '#1A1A1A', // Dark/black
  },
  friendFamilyBar: {
    backgroundColor: '#00BFA5', // Teal/cyan
  },
  remainingBar: {
    backgroundColor: '#B3E5FC', // Light blue
  },
  categoriesContainer: {
    gap: 12,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  subscriptionDot: {
    backgroundColor: '#1A1A1A',
  },
  friendFamilyDot: {
    backgroundColor: '#00BFA5',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});
