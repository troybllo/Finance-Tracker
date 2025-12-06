import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { BarChart } from 'react-native-gifted-charts';
import useExpenseStore from '../store/expenseStore';
import { useEffect } from 'react';
import { Expense } from '../store/expenseStore';

const getWeekRange = () => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 (Sun) to 6 (Sat)

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - dayOfWeek);
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  return { startOfWeek, endOfWeek };
};

export default function ExpenseScreen() {
  const createExpense = useExpenseStore(state => state.createExpense);
  const deleteExpense = useExpenseStore(state => state.deleteExpense);
  const updateExpense = useExpenseStore(state => state.updateExpense);
  const fetchExpenses = useExpenseStore(state => state.fetchExpenses);
  const expenses = useExpenseStore(state => state.expenses);
  const loading = useExpenseStore(state => state.loading);

  useEffect(() => {
    const { startOfWeek, endOfWeek } = getWeekRange();

    fetchExpenses({
      from: startOfWeek.toISOString().split('T')[0], // "2024-11-24"
      to: endOfWeek.toISOString().split('T')[0], // "2024-11-30"
    });
  }, []);

  // Calculate weekly total
  const weeklyTotal = expenses
    .reduce((sum, expense) => {
      return sum + parseFloat(expense.amount);
    }, 0)
    .toFixed(2);

  const getExpensesByDay = () => {
    const grouped: { [key: string]: { expenses: Expense[]; total: number } } =
      {};

    expenses.forEach(expense => {
      const date = new Date(expense.date);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

      if (!grouped[dayName]) {
        grouped[dayName] = { expenses: [], total: 0 };
      }

      grouped[dayName].expenses.push(expense);
      grouped[dayName].total += parseFloat(expense.amount);
    });
    return grouped;
  };

  const expensesByDay = getExpensesByDay();

  // Calculate average per day (divide by 7 days)
  const averagePerDay = (parseFloat(weeklyTotal) / 7).toFixed(2);

  const barData = [
    {
      value: expensesByDay.Mon?.total || 0,
      label: 'Mon',
      frontColor: '#F56565',
    },
    {
      value: expensesByDay.Tue?.total || 0,
      label: 'Tue',
      frontColor: '#F56565',
    },
    {
      value: expensesByDay.Wed?.total || 0,
      label: 'Wed',
      frontColor: '#F56565',
    },
    {
      value: expensesByDay.Thu?.total || 0,
      label: 'Thu',
      frontColor: '#F56565',
    },
    {
      value: expensesByDay.Fri?.total || 0,
      label: 'Fri',
      frontColor: '#F56565',
    },
    {
      value: expensesByDay.Sat?.total || 0,
      label: 'Sat',
      frontColor: '#F56565',
    },
    {
      value: expensesByDay.Sun?.total || 0,
      label: 'Sun',
      frontColor: '#F56565',
    },
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.title}>Expenses</Text>
            <Text style={styles.subtitle}>Track your spending</Text>
          </View>

          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Weekly Expenses</Text>
              <Text style={styles.chartTotal}>${weeklyTotal}</Text>
            </View>

            <View style={styles.chartContainer}>
              <BarChart
                data={barData}
                barWidth={32}
                spacing={20}
                roundedTop
                roundedBottom
                hideRules
                xAxisThickness={0}
                yAxisThickness={0}
                yAxisTextStyle={styles.yAxisLabel}
                noOfSections={4}
                maxValue={1000}
                isAnimated
                animationDuration={800}
                barBorderRadius={8}
              />
            </View>

            <View style={styles.chartFooter}>
              <Text style={styles.chartFooterText}>
                Average: ${averagePerDay} per day
              </Text>
            </View>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Highest Day</Text>
              <Text style={styles.statValue}>$820.00</Text>
              <Text style={styles.statDay}>Saturday</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Lowest Day</Text>
              <Text style={styles.statValue}>$290.00</Text>
              <Text style={styles.statDay}>Thursday</Text>
            </View>
          </View>
          <View style={styles.handleCard}>
            <TouchableOpacity style={styles.addExpense}>
              <Text style={styles.addExpenseText}>+ Add Expense</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteExpense}>
              <Text style={styles.deleteExpenseText}>Delete Expense</Text>
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
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  subtitle: {
    fontSize: 14,
    color: '#718096',
    marginTop: 4,
  },
  chartCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  chartHeader: {
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
  },
  chartTotal: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F56565',
  },
  chartContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  yAxisLabel: {
    fontSize: 12,
    color: '#A0AEC0',
  },
  chartFooter: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  chartFooterText: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#A0AEC0',
    fontWeight: '500',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  statDay: {
    fontSize: 13,
    color: '#718096',
  },
  handleCard: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  addExpense: {
    flex: 1,
    backgroundColor: '#48BB78',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#48BB78',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addExpenseText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteExpense: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#F56565',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  deleteExpenseText: {
    color: '#F56565',
    fontSize: 16,
    fontWeight: '600',
  },
});
