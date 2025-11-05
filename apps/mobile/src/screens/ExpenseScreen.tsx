import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { BarChart } from 'react-native-gifted-charts';

export default function ExpenseScreen() {
  const barData = [
    { value: 450, label: 'Mon', frontColor: '#F56565' },
    { value: 320, label: 'Tue', frontColor: '#F56565' },
    { value: 580, label: 'Wed', frontColor: '#F56565' },
    { value: 290, label: 'Thu', frontColor: '#F56565' },
    { value: 670, label: 'Fri', frontColor: '#F56565' },
    { value: 820, label: 'Sat', frontColor: '#F56565' },
    { value: 390, label: 'Sun', frontColor: '#F56565' },
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Expenses</Text>
            <Text style={styles.subtitle}>Track your spending</Text>
          </View>

          {/* Chart Card */}
          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Weekly Expenses</Text>
              <Text style={styles.chartTotal}>$3,520.00</Text>
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
                Average: $502.86 per day
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
});
