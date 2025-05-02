import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { X, Calendar, Clock } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

export default function InviteGuestScreen() {
  const router = useRouter();

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
          <Text style={styles.title}>Invite Guest</Text>
          <Text style={styles.subtitle}>Register your visitor for easy entry</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(600).delay(100)} style={styles.form}>
          <Text style={styles.label}>Guest Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter guest's full name"
            placeholderTextColor="#9CA3AF"
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter guest's phone number"
            placeholderTextColor="#9CA3AF"
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Number of Visitors</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter number of visitors"
            placeholderTextColor="#9CA3AF"
            keyboardType="number-pad"
          />

          <Text style={styles.label}>Visit Date</Text>
          <TouchableOpacity style={styles.dateTimeButton}>
            <Calendar size={20} color="#6B7280" />
            <Text style={styles.dateTimeButtonText}>Select Date</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Expected Time</Text>
          <TouchableOpacity style={styles.dateTimeButton}>
            <Clock size={20} color="#6B7280" />
            <Text style={styles.dateTimeButtonText}>Select Time</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Purpose of Visit</Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            placeholder="Enter purpose of visit"
            placeholderTextColor="#9CA3AF"
          />
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(600).delay(200)}
          style={styles.buttonContainer}
        >
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Generate Guest Pass</Text>
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
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  dateTimeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
  },
  dateTimeButtonText: {
    fontSize: 16,
    color: '#6B7280',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
    height: 100,
    textAlignVertical: 'top',
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