import { useLocalSearchParams, router } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { ArrowLeft, Calendar, MapPin, MessageCircle, Heart, Share2, Users } from 'lucide-react-native';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams();
  
  // In a real app, fetch event details based on id
  const event = {
    id: 1,
    title: 'Annual Society Meeting',
    date: 'Apr 25, 7:00 PM',
    location: 'Community Hall',
    attendees: 42,
    image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Join us for our annual society meeting where we will discuss upcoming projects, budget allocation, and elect new committee members.',
    organizer: {
      name: 'Rahul Shah',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'Society Secretary'
    },
    agenda: [
      'Welcome and Introduction',
      'Financial Report 2023-24',
      'Maintenance Projects Update',
      'Committee Election',
      'Open Discussion'
    ]
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View 
        entering={FadeIn.duration(600)}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton}>
          <Share2 size={24} color="#111827" />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(600).delay(100)}>
        <Image source={{ uri: event.image }} style={styles.eventImage} />
      </Animated.View>

      <Animated.View 
        entering={FadeInDown.duration(600).delay(200)}
        style={styles.content}
      >
        <Text style={styles.title}>{event.title}</Text>

        <View style={styles.organizerContainer}>
          <Image source={{ uri: event.organizer.avatar }} style={styles.organizerAvatar} />
          <View style={styles.organizerInfo}>
            <Text style={styles.organizerName}>{event.organizer.name}</Text>
            <Text style={styles.organizerRole}>{event.organizer.role}</Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Calendar size={20} color="#6B7280" />
            <Text style={styles.detailText}>{event.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <MapPin size={20} color="#6B7280" />
            <Text style={styles.detailText}>{event.location}</Text>
          </View>
          <View style={styles.detailRow}>
            <Users size={20} color="#6B7280" />
            <Text style={styles.detailText}>{event.attendees} Attendees</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Event</Text>
          <Text style={styles.description}>{event.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Agenda</Text>
          {event.agenda.map((item, index) => (
            <View key={index} style={styles.agendaItem}>
              <Text style={styles.agendaNumber}>{index + 1}</Text>
              <Text style={styles.agendaText}>{item}</Text>
            </View>
          ))}
        </View>
      </Animated.View>

      <Animated.View 
        entering={FadeInDown.duration(600).delay(300)}
        style={styles.footer}
      >
        <TouchableOpacity style={styles.attendButton}>
          <Text style={styles.attendButtonText}>Attend Event</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#111827',
    marginBottom: 16,
  },
  organizerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  organizerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  organizerInfo: {
    flex: 1,
  },
  organizerName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
  },
  organizerRole: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
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
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
  agendaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  agendaNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EDE9FE',
    color: '#7E3AF2',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 12,
  },
  agendaText: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#4B5563',
  },
  footer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  attendButton: {
    backgroundColor: '#7E3AF2',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  attendButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  spacer: {
    height: 40,
  },
});