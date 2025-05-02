import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { X } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

const PAYMENT_OPTIONS = [
  { id: 1, title: 'Monthly Maintenance', amount: 2450 },
  { id: 2, title: 'Parking Fee', amount: 500 },
  { id: 3, title: 'Club House Charges', amount: 1000 },
];

export default function PayDuesScreen() {
  const router = useRouter();
  const totalAmount = PAYMENT_OPTIONS.reduce((sum, option) => sum + option.amount, 0);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <X size={24} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeIn.duration(600)} style={styles.header}>
          <Text style={styles.title}>Pay Society Dues</Text>
          <Text style={styles.subtitle}>Select the dues you want to pay</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(600).delay(100)}>
          {PAYMENT_OPTIONS.map((option, index) => (
            <View key={option.id} style={styles.paymentOption}>
              <View>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.dueDate}>Due by Apr 30</Text>
              </View>
              <Text style={styles.amount}>₹{option.amount}</Text>
            </View>
          ))}
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(600).delay(200)}
          style={styles.totalContainer}
        >
          <Text style={styles.totalText}>Total Amount</Text>
          <Text style={styles.totalAmount}>₹{totalAmount}</Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(600).delay(300)}
          style={styles.buttonContainer}
        >
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Proceed to Pay</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  paymentOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  dueDate: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  totalContainer: {
    padding: 20,
    backgroundColor: '#F9FAFB',
    marginTop: 20,
  },
  totalText: {
    fontSize: 16,
    color: '#6B7280',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 4,
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  button: {
    backgroundColor: '#7E3AF2',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});