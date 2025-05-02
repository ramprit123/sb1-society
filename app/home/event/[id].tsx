import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ChevronLeft, Calendar, MapPin, Users } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

const events = [
  {
    id: 1,
    title: 'Annual Society Meeting',
    date: 'Apr 25, 7:00 PM',
    location: 'Community Hall',
    image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Join us for our annual society meeting where we will discuss upcoming projects, budget allocation, and elect new committee members.',
    agenda: [
      'Welcome and Introduction',
      'Financial Report 2023-24',
      'Maintenance Projects Update',
      'Committee Election',
      'Open Discussion'
    ],
    attendees: 42
  },
  {
    id: 2,
    title: 'Community Lunch',
    date: 'Apr 28, 12:00 PM',
    location: 'Society Garden',
    image: 'https://images.pexels.com/photos/7500307/pexels-photo-7500307.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'A wonderful opportunity to meet your neighbors and enjoy delicious food together. Each family is encouraged to bring one dish.',
    menu: [
      'Welcome Drinks',
      'Appetizers',
      'Main Course',
      'Desserts'
    ],
    attendees: 35
  }
];

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams();
  const event = events.find(e => e.id === Number(id));

  if (!event) {
    return (
      <View style={styles.container}>
        <Text>Event not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: event.image }} style={styles.coverImage} />

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ChevronLeft size={24} color="#FFF" />
      </TouchableOpacity>

      <Animated.View entering={FadeIn.duration(600)} style={styles.content}>
        <Text style={styles.title}>{event.title}</Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Calendar size={20} color="#6B7280" />
            <Text style={styles.infoText}>{event.date}</Text>
          </View>

          <View style={styles.infoRow}>
            <MapPin size={20} color="#6B7280" />
            <Text style={styles.infoText}>{event.location}</Text>
          </View>

          <View style={styles.infoRow}>
            <Users size={20} color="#6B7280" />
            <Text style={styles.infoText}>{event.attendees} Attending</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Event</Text>
          <Text style={styles.description}>{event.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {event.id === 1 ? 'Agenda' : 'Menu'}
          </Text>
          {(event.id === 1 ? event.agenda! : event.menu!).map((item, index) => (
            <View key={index} style={styles.listItem}>
              <View style={styles.bullet} />
              <Text style={styles.listItemText}>{item}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.attendButton}>
          <Text style={styles.attendButtonText}>I'm Interested</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  coverImage: {
    width: '100%',
    height: 250,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
    marginTop: -40,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#111827',
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4B5563',
    marginLeft: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 12,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 24,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#7E3AF2',
    marginRight: 12,
  },
  listItemText: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: '#4B5563',
  },
  attendButton: {
    backgroundColor: '#7E3AF2',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  attendButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});