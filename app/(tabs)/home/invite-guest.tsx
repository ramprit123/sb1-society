import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { X, Calendar, Clock } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';

export default function InviteGuestScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    guestName: '',
    phoneNumber: '',
    numberOfVisitors: '',
    visitDate: new Date(),
    expectedTime: new Date(),
    purposeOfVisit: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData((prev) => ({ ...prev, visitDate: selectedDate }));
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setFormData((prev) => ({ ...prev, expectedTime: selectedTime }));
    }
  };

  const handleGeneratePass = () => {
    // Here you would implement the logic to generate and save the guest pass
    console.log('Generating guest pass with data:', formData);
    router.back();
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
          headerLeft: () => {
            return <Text style={styles.title}>Invite Guest</Text>;
          },
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeIn.duration(600)} style={styles.header}>
          <Text style={styles.subtitle}>
            Register your visitor for easy entry
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(600).delay(100)}
          style={styles.form}
        >
          <Text style={styles.label}>Guest Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter guest's full name"
            placeholderTextColor="#9CA3AF"
            value={formData.guestName}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, guestName: text }))
            }
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter guest's phone number"
            placeholderTextColor="#9CA3AF"
            keyboardType="phone-pad"
            value={formData.phoneNumber}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, phoneNumber: text }))
            }
          />

          <Text style={styles.label}>Number of Visitors</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter number of visitors"
            placeholderTextColor="#9CA3AF"
            keyboardType="number-pad"
            value={formData.numberOfVisitors}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, numberOfVisitors: text }))
            }
          />

          <Text style={styles.label}>Visit Date</Text>
          <TouchableOpacity
            style={styles.dateTimeButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Calendar size={20} color="#6B7280" />
            <Text style={styles.dateTimeButtonText}>
              {formData.visitDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={formData.visitDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}

          <Text style={styles.label}>Expected Time</Text>
          <TouchableOpacity
            style={styles.dateTimeButton}
            onPress={() => setShowTimePicker(true)}
          >
            <Clock size={20} color="#6B7280" />
            <Text style={styles.dateTimeButtonText}>
              {formData.expectedTime.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={formData.expectedTime}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleTimeChange}
            />
          )}

          <Text style={styles.label}>Purpose of Visit</Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            placeholder="Enter purpose of visit"
            placeholderTextColor="#9CA3AF"
            value={formData.purposeOfVisit}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, purposeOfVisit: text }))
            }
          />
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(600).delay(200)}
          style={styles.buttonContainer}
        >
          <TouchableOpacity
            style={[
              styles.button,
              (!formData.guestName ||
                !formData.phoneNumber ||
                !formData.numberOfVisitors ||
                !formData.purposeOfVisit) &&
                styles.buttonDisabled,
            ]}
            onPress={handleGeneratePass}
            disabled={
              !formData.guestName ||
              !formData.phoneNumber ||
              !formData.numberOfVisitors ||
              !formData.purposeOfVisit
            }
          >
            <Text style={styles.buttonText}>Generate Guest Pass</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonDisabled: {
    backgroundColor: '#9CA3AF',
    opacity: 0.7,
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
