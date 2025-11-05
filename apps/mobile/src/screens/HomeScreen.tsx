import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {/*Header*/}
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Track your finances</Text>
            </View>
            <View style={styles.headerProfile}>
              <View style={styles.profileCircle}>
                <Text style={styles.profileInitial}>U</Text>
              </View>
            </View>
          </View>

          {/*Balance Cards*/}
          <View style={styles.infoSection}>
            <View style={styles.infoCard1}>
              <Text style={styles.cardLabel}>Total Balance</Text>
              <Text style={styles.cardAmount}>$12,345.67</Text>
              <Text style={styles.cardSubtext}>+2.5% from last month</Text>
            </View>
            <View style={styles.infoSection2}>
              <View style={styles.infoCard2}>
                <Text style={styles.cardLabelSmall}>Income</Text>
                <Text style={styles.cardAmountSmall}>$5,420.00</Text>
              </View>
              <View style={styles.infoCard3}>
                <Text style={styles.cardLabelSmall}>Expenses</Text>
                <Text style={styles.cardAmountSmall}>$3,280.50</Text>
              </View>
            </View>
          </View>

          {/*Quick Actions*/}
          <View style={styles.quickActions}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.actionIcon}>
                  <Text style={styles.actionIconText}>+</Text>
                </View>
                <Text style={styles.actionText}>Add Income</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <View style={[styles.actionIcon, styles.actionIconExpense]}>
                  <Text style={styles.actionIconText}>-</Text>
                </View>
                <Text style={styles.actionText}>Add Expense</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <View style={[styles.actionIcon, styles.actionIconTransfer]}>
                  <Text style={styles.actionIconText}>→</Text>
                </View>
                <Text style={styles.actionText}>Transfer</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/*Recent Transactions*/}
          <View style={styles.transactions}>
            <View style={styles.transactionsHeader}>
              <Text style={styles.sectionTitle}>Recent Transactions</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <View
                  style={[
                    styles.transactionIcon,
                    { backgroundColor: '#FFE5E5' },
                  ]}
                >
                  <Text style={styles.transactionEmoji}>🛒</Text>
                </View>
                <View>
                  <Text style={styles.transactionName}>Grocery Store</Text>
                  <Text style={styles.transactionDate}>Today, 2:30 PM</Text>
                </View>
              </View>
              <Text style={styles.transactionAmountExpense}>-$45.20</Text>
            </View>

            <View style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <View
                  style={[
                    styles.transactionIcon,
                    { backgroundColor: '#E5F5FF' },
                  ]}
                >
                  <Text style={styles.transactionEmoji}>💼</Text>
                </View>
                <View>
                  <Text style={styles.transactionName}>Salary Deposit</Text>
                  <Text style={styles.transactionDate}>Yesterday, 9:00 AM</Text>
                </View>
              </View>
              <Text style={styles.transactionAmountIncome}>+$3,500.00</Text>
            </View>

            <View style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <View
                  style={[
                    styles.transactionIcon,
                    { backgroundColor: '#FFF5E5' },
                  ]}
                >
                  <Text style={styles.transactionEmoji}>☕</Text>
                </View>
                <View>
                  <Text style={styles.transactionName}>Coffee Shop</Text>
                  <Text style={styles.transactionDate}>Yesterday, 8:15 AM</Text>
                </View>
              </View>
              <Text style={styles.transactionAmountExpense}>-$5.50</Text>
            </View>

            <View style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <View
                  style={[
                    styles.transactionIcon,
                    { backgroundColor: '#F0E5FF' },
                  ]}
                >
                  <Text style={styles.transactionEmoji}>🎮</Text>
                </View>
                <View>
                  <Text style={styles.transactionName}>Entertainment</Text>
                  <Text style={styles.transactionDate}>Dec 2, 6:45 PM</Text>
                </View>
              </View>
              <Text style={styles.transactionAmountExpense}>-$29.99</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
  },
  headerText: {
    flex: 1,
  },
  headerProfile: {
    marginLeft: 15,
  },
  profileCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  subtitle: {
    fontSize: 14,
    color: '#718096',
    marginTop: 4,
  },
  infoSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  infoCard1: {
    flex: 2,
    backgroundColor: '#4A90E2',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  infoSection2: {
    flex: 1,
    gap: 12,
  },
  infoCard2: {
    flex: 1,
    backgroundColor: '#48BB78',
    borderRadius: 16,
    padding: 15,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  infoCard3: {
    flex: 1,
    backgroundColor: '#F56565',
    borderRadius: 16,
    padding: 15,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  cardAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 8,
  },
  cardSubtext: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  cardLabelSmall: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  cardAmountSmall: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 4,
  },
  quickActions: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 15,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionIconExpense: {
    backgroundColor: '#F56565',
  },
  actionIconTransfer: {
    backgroundColor: '#9F7AEA',
  },
  actionIconText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  actionText: {
    fontSize: 12,
    color: '#4A5568',
    fontWeight: '600',
    textAlign: 'center',
  },
  transactions: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  seeAll: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionEmoji: {
    fontSize: 20,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  transactionDate: {
    fontSize: 13,
    color: '#A0AEC0',
    marginTop: 2,
  },
  transactionAmountExpense: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F56565',
  },
  transactionAmountIncome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#48BB78',
  },
});
