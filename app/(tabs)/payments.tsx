import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { ChevronLeft, Bell, CircleCheck as CheckCircle2 } from 'lucide-react-native';
import { formatCurrency } from '@/utils/formatters';

const bills = [
  {
    id: 1,
    type: 'Maintenance Fee',
    amount: 8500,
    dueIn: 5,
    icon: 'building',
  },
  {
    id: 2,
    type: 'Water Charges',
    amount: 2200,
    dueIn: 8,
    icon: 'water',
  },
  {
    id: 3,
    type: 'Electricity Bill',
    amount: 1750,
    dueIn: 12,
    icon: 'electricity',
  }
];

const recentPayments = [
  {
    id: 1,
    type: 'Maintenance Fee',
    amount: 8500,
    date: '15 Jun 2023',
    month: 'June 2023',
  },
  {
    id: 2,
    type: 'Water Charges',
    amount: 2200,
    date: '10 Jun 2023',
    month: 'June 2023',
  },
  {
    id: 3,
    type: 'Electricity Bill',
    amount: 1750,
    date: '05 Jun 2023',
    month: 'June 2023',
  }
];

export default function PaymentsScreen() {
  const totalDue = bills.reduce((sum, bill) => sum + bill.amount, 0);

  const getIconBackground = (icon: string) => {
    switch(icon) {
      case 'building':
        return 'rgba(126, 58, 242, 0.1)';
      case 'water':
        return 'rgba(59, 130, 246, 0.1)';
      case 'electricity':
        return 'rgba(249, 115, 22, 0.1)';
      default:
        return 'rgba(126, 58, 242, 0.1)';
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View 
        entering={FadeIn.duration(600)}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backButton}>
          <ChevronLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bill Payments</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={22} color="#333" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </Animated.View>
      
      <Animated.View 
        entering={FadeInDown.duration(600).delay(100)}
        style={styles.totalDueCard}
      >
        <Text style={styles.totalDueLabel}>Total Due</Text>
        <Text style={styles.totalDueAmount}>{formatCurrency(totalDue)}</Text>
        <Text style={styles.totalDueDate}>Due Date: 25th July 2023</Text>
      </Animated.View>
      
      <Animated.View 
        entering={FadeInDown.duration(600).delay(200)}
        style={styles.section}
      >
        <Text style={styles.sectionTitle}>Current Bills</Text>
        {bills.map((bill) => (
          <View key={bill.id} style={styles.billItem}>
            <View style={[styles.billIconContainer, { backgroundColor: getIconBackground(bill.icon) }]}>
              <Text style={styles.billIcon}>
                {bill.icon === 'building' && '🏢'}
                {bill.icon === 'water' && '💧'}
                {bill.icon === 'electricity' && '⚡️'}
              </Text>
            </View>
            <View style={styles.billInfo}>
              <Text style={styles.billType}>{bill.type}</Text>
              <Text style={styles.billAmount}>{formatCurrency(bill.amount)}</Text>
              <Text style={styles.billDue}>Due in {bill.dueIn} days</Text>
            </View>
            <TouchableOpacity style={styles.payButton}>
              <Text style={styles.payButtonText}>Pay Now</Text>
            </TouchableOpacity>
          </View>
        ))}
      </Animated.View>
      
      <Animated.View 
        entering={FadeInDown.duration(600).delay(300)}
        style={styles.section}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Payments</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllLink}>View All</Text>
          </TouchableOpacity>
        </View>
        
        {recentPayments.map((payment) => (
          <View key={payment.id} style={styles.paymentItem}>
            <View style={styles.paymentCheckContainer}>
              <CheckCircle2 size={20} color="#10B981" />
            </View>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentType}>{payment.type}</Text>
              <Text style={styles.paymentMonth}>{payment.month}</Text>
            </View>
            <View style={styles.paymentAmountContainer}>
              <Text style={styles.paymentAmount}>{formatCurrency(payment.amount)}</Text>
              <Text style={styles.paymentDate}>{payment.date}</Text>
            </View>
          </View>
        ))}
      </Animated.View>
      
      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
  },
  notificationButton: {
    position: 'relative',
    padding: 5,
  },
  notificationBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  totalDueCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  totalDueLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  totalDueAmount: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#7E3AF2',
    marginBottom: 8,
  },
  totalDueDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
  },
  viewAllLink: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#7E3AF2',
  },
  billItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  billIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  billIcon: {
    fontSize: 20,
  },
  billInfo: {
    flex: 1,
  },
  billType: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  billAmount: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#7E3AF2',
    marginBottom: 4,
  },
  billDue: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#EF4444',
  },
  payButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#7E3AF2',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  payButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#7E3AF2',
  },
  paymentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  paymentCheckContainer: {
    marginRight: 16,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentType: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  paymentMonth: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  paymentAmountContainer: {
    alignItems: 'flex-end',
  },
  paymentAmount: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  paymentDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  spacer: {
    height: 100,
  },
});