import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { X, Calendar, Clock } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

const AMENITIES = [
  {
    id: 1,
    name: 'Club House',
    image: 'https://example.com/clubhouse.jpg',
    price: '₹500/hour',
  },
  {
    id: 2,
    name: 'Swimming Pool',
    image: 'https://example.com/pool.jpg',
    price: '₹200/person',
  },
  {
    id: 3,
    name: 'Gym',
    image: 'https://example.com/gym.jpg',
    price: '₹1000/month',
  },
  {
    id: 4,
    name: 'Tennis Court',
    image: 'https://example.com/tennis.jpg',
    price: '₹300/hour',
  },
];

export default function BookAmenityScreen() {
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
          <Text style={styles.title}>Book Amenity</Text>
          <Text style={styles.subtitle}>Select and book society facilities</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(600).delay(100)}>
          {AMENITIES.map((amenity) => (
            <TouchableOpacity key={amenity.id} style={styles.amenityCard}>
              <View style={styles.amenityInfo}>
                <Text style={styles.amenityName}>{amenity.name}</Text>
                <Text style={styles.amenityPrice}>{amenity.price}</Text>
              </View>
              <View style={styles.bookingOptions}>
                <TouchableOpacity style={styles.dateButton}>
                  <Calendar size={20} color="#6B7280" />
                  <Text style={styles.dateButtonText}>Select Date</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.timeButton}>
                  <Clock size={20} color="#6B7280" />
                  <Text style={styles.timeButtonText}>Select Time</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(600).delay(200)}
          style={styles.buttonContainer}
        >
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Proceed to Book</Text>
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
  amenityCard: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  amenityInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  amenityName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1F2937',
  },
  amenityPrice: {
    fontSize: 16,
    color: '#6B7280',
  },
  bookingOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  dateButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
  },
  dateButtonText: {
    color: '#6B7280',
    fontSize: 14,
  },
  timeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
  },
  timeButtonText: {
    color: '#6B7280',
    fontSize: 14,
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