import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { Activity, ArrowUp, ArrowDown, Users, CreditCard, Calendar, Bell } from 'lucide-react-native';
import { LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: () => '#7E3AF2',
        strokeWidth: 2
      }
    ]
  };

  const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    color: (opacity = 1) => `rgba(126, 58, 242, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View 
        entering={FadeIn.duration(600)}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Dashboard</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color="#111827" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View 
        entering={FadeInDown.duration(600).delay(100)}
        style={styles.statsContainer}
      >
        <View style={styles.statsCard}>
          <View style={[styles.iconContainer, styles.purpleLight]}>
            <Users size={20} color="#7E3AF2" />
          </View>
          <Text style={styles.statsValue}>1,257</Text>
          <Text style={styles.statsLabel}>Total Residents</Text>
          <View style={styles.statsChange}>
            <ArrowUp size={16} color="#10B981" />
            <Text style={styles.statsChangeText}>+3.2%</Text>
          </View>
        </View>

        <View style={styles.statsCard}>
          <View style={[styles.iconContainer, styles.greenLight]}>
            <CreditCard size={20} color="#10B981" />
          </View>
          <Text style={styles.statsValue}>₹85.5K</Text>
          <Text style={styles.statsLabel}>Revenue</Text>
          <View style={styles.statsChange}>
            <ArrowUp size={16} color="#10B981" />
            <Text style={styles.statsChangeText}>+2.4%</Text>
          </View>
        </View>

        <View style={styles.statsCard}>
          <View style={[styles.iconContainer, styles.orangeLight]}>
            <Calendar size={20} color="#F97316" />
          </View>
          <Text style={styles.statsValue}>23</Text>
          <Text style={styles.statsLabel}>Events</Text>
          <View style={styles.statsChange}>
            <ArrowDown size={16} color="#EF4444" />
            <Text style={[styles.statsChangeText, styles.negative]}>-1.1%</Text>
          </View>
        </View>
      </Animated.View>

      <Animated.View 
        entering={FadeInDown.duration(600).delay(200)}
        style={styles.chartContainer}
      >
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Revenue Analytics</Text>
          <View style={styles.chartPeriod}>
            <Text style={styles.chartPeriodText}>Last 6 months</Text>
          </View>
        </View>
        <LineChart
          data={chartData}
          width={width - 40}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </Animated.View>

      <Animated.View 
        entering={FadeInDown.duration(600).delay(300)}
        style={styles.activitiesContainer}
      >
        <Text style={styles.sectionTitle}>Recent Activities</Text>
        
        <View style={styles.activityItem}>
          <View style={[styles.activityIcon, styles.purpleLight]}>
            <Activity size={20} color="#7E3AF2" />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>New Maintenance Request</Text>
            <Text style={styles.activityDescription}>Block A - Water Leakage Issue</Text>
            <Text style={styles.activityTime}>2 hours ago</Text>
          </View>
        </View>

        <View style={styles.activityItem}>
          <View style={[styles.activityIcon, styles.greenLight]}>
            <CreditCard size={20} color="#10B981" />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Payment Received</Text>
            <Text style={styles.activityDescription}>Monthly Maintenance - ₹2,500</Text>
            <Text style={styles.activityTime}>5 hours ago</Text>
          </View>
        </View>

        <View style={styles.activityItem}>
          <View style={[styles.activityIcon, styles.orangeLight]}>
            <Calendar size={20} color="#F97316" />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Event Scheduled</Text>
            <Text style={styles.activityDescription}>Annual Society Meeting</Text>
            <Text style={styles.activityTime}>1 day ago</Text>
          </View>
        </View>
      </Animated.View>

      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#111827',
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  statsCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  purpleLight: {
    backgroundColor: '#EDE9FE',
  },
  greenLight: {
    backgroundColor: '#D1FAE5',
  },
  orangeLight: {
    backgroundColor: '#FFEDD5',
  },
  statsValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#111827',
    marginBottom: 4,
  },
  statsLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  statsChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsChangeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#10B981',
    marginLeft: 4,
  },
  negative: {
    color: '#EF4444',
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
  },
  chartPeriod: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  chartPeriodText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#64748B',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  activitiesContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#111827',
    marginBottom: 4,
  },
  activityDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  activityTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#94A3B8',
  },
  spacer: {
    height: 20,
  },
})