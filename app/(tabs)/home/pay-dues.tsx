import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { X, Check } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useState } from 'react';

const PAYMENT_OPTIONS = [
  { id: 1, title: 'Monthly Maintenance', amount: 2450, selected: false },
  { id: 2, title: 'Parking Fee', amount: 500, selected: false },
  { id: 3, title: 'Club House Charges', amount: 1000, selected: false },
];

export default function PayDuesScreen() {
  const router = useRouter();
  const [paymentOptions, setPaymentOptions] = useState(PAYMENT_OPTIONS);

  const totalAmount = paymentOptions
    .filter((option) => option.selected)
    .reduce((sum, option) => sum + option.amount, 0);

  const handleOptionSelect = (id: number) => {
    setPaymentOptions((prev) =>
      prev.map((option) =>
        option.id === id ? { ...option, selected: !option.selected } : option
      )
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: '',
          headerRight: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <X size={24} color="#000" />
            </TouchableOpacity>
          ),
          headerLeft(props) {
            return <Text style={styles.title}>Pay Dues</Text>;
          },
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeIn.duration(600)} style={styles.header}>
          <Text style={styles.subtitle}>Select the dues you want to pay</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(600).delay(100)}>
          {paymentOptions.map((option, index) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.paymentOption,
                option.selected && styles.selectedOption,
              ]}
              onPress={() => handleOptionSelect(option.id)}
            >
              <View style={styles.optionContent}>
                <View>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.dueDate}>Due by Apr 30</Text>
                </View>
                <View style={styles.amountContainer}>
                  <Text style={styles.amount}>₹{option.amount}</Text>
                  {option.selected && (
                    <View style={styles.checkmark}>
                      <Check size={16} color="#7E3AF2" />
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
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
  optionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  selectedOption: {
    backgroundColor: '#F5F3FF',
    borderColor: '#7E3AF2',
    borderWidth: 1,
    borderRadius: 8,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F5F3FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
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