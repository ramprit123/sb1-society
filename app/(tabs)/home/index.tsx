import { router } from 'expo-router';
import {
  CircleAlert as AlertCircle,
  Calendar,
  ChevronRight,
  UserPlus,
  Wallet,
} from 'lucide-react-native';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  withTiming,
  withDelay,
  withSequence,
} from 'react-native-reanimated';

import { formatCurrency } from '@/utils/formatters';

const CURRENT_USER = {
  name: 'Alex',
  avatar:
    'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
  dueAmount: 2450,
  dueDate: '2024-04-30',
};

const events = [
  {
    id: 1,
    title: 'Annual Society Meeting',
    date: 'Apr 25, 7:00 PM',
    location: 'Community Hall',
    image:
      'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=600',
    description:
      'Join us for our annual society meeting where we will discuss upcoming projects, budget allocation, and elect new committee members.',
    agenda: [
      'Welcome and Introduction',
      'Financial Report 2023-24',
      'Maintenance Projects Update',
      'Committee Election',
      'Open Discussion',
    ],
  },
  {
    id: 2,
    title: 'Community Lunch',
    date: 'Apr 28, 12:00 PM',
    location: 'Society Garden',
    image:
      'https://images.pexels.com/photos/7500307/pexels-photo-7500307.jpeg?auto=compress&cs=tinysrgb&w=600',
    description:
      'A wonderful opportunity to meet your neighbors and enjoy delicious food together. Each family is encouraged to bring one dish.',
    menu: ['Welcome Drinks', 'Appetizers', 'Main Course', 'Desserts'],
  },
];

const updates = [
  {
    id: 1,
    title: 'Water Supply Notice',
    description: 'Scheduled maintenance on Apr 24, 10 PM - 11 PM',
    time: '2 hours ago',
    type: 'maintenance',
    fullDescription:
      'Due to essential maintenance work on the main water supply line, there will be no water supply during the specified time. Please store water in advance. Emergency water tankers will be available if needed.',
    affectedAreas: ['Block A', 'Block B', 'Block C'],
    contactPerson: 'Mr. Sharma (Maintenance Head)',
    contactNumber: '+91 98765 43210',
  },
  {
    id: 2,
    title: 'New Activity Center Timings',
    description: 'Updated hours: 6 AM - 10 PM',
    time: '1 day ago',
    type: 'announcement',
    fullDescription:
      "Based on resident feedback, we have extended the Activity Center timing. New rules and regulations have been put in place to ensure everyone's safety and comfort.",
    newTimings: {
      weekdays: '6:00 AM - 10:00 PM',
      weekends: '5:30 AM - 11:00 PM',
    },
    rules: [
      'Please carry your resident ID',
      'Maximum 2 guests allowed per resident',
      'Prior booking required for groups',
      'Please maintain cleanliness',
    ],
  },
];

export default function HomeScreen() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleQuickAction = (action: string) => {
    router.push(`/(tabs)/home/${action}` as any);
  };

  const handleEventPress = (id: number) => {
    router.push(`/home/event/${id}`);
  };

  const handleUpdatePress = (id: number) => {
    router.push(`/home/update/${id}`);
  };

  const enteringAnimation = {
    entering: (targetValues: { delay?: number }) => {
      'worklet';
      return {
        initialValues: {
          opacity: 0,
          transform: [{ translateY: 20 }],
        },
        animations: {
          opacity: withDelay(
            targetValues.delay || 0,
            withTiming(1, { duration: 600 })
          ),
          transform: [
            {
              translateY: withDelay(
                targetValues.delay || 0,
                withTiming(0, { duration: 600 })
              ),
            },
          ],
        },
      };
    },
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View style={styles.header} entering={FadeIn.delay(0)} />

      <Animated.View
        style={styles.quickActionsContainer}
        {...enteringAnimation}
        entering={FadeInDown.delay(100)}
      >
        <TouchableOpacity
          style={styles.quickAction}
          onPress={() => handleQuickAction('pay-dues')}
        >
          <View style={[styles.iconContainer, styles.purpleLight]}>
            <Wallet size={24} color="#7E3AF2" />
          </View>
          <Text style={styles.quickActionText}>Pay Dues</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickAction}
          onPress={() => handleQuickAction('report-issue')}
        >
          <View style={[styles.iconContainer, styles.orangeLight]}>
            <AlertCircle size={24} color="#F97316" />
          </View>
          <Text style={styles.quickActionText}>Report Issue</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickAction}
          onPress={() => handleQuickAction('invite-guest')}
        >
          <View style={[styles.iconContainer, styles.blueLight]}>
            <UserPlus size={24} color="#3B82F6" />
          </View>
          <Text style={styles.quickActionText}>Invite Guest</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickAction}
          onPress={() => handleQuickAction('book-amenity')}
        >
          <View style={[styles.iconContainer, styles.greenLight]}>
            <Calendar size={24} color="#10B981" />
          </View>
          <Text style={styles.quickActionText}>Book Amenity</Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.rowContainer}>
        <Animated.View
          style={[styles.card, styles.halfCard]}
          {...enteringAnimation}
          entering={FadeInDown.delay(200)}
        >
          <Text style={styles.cardTitle}>Pending Bills</Text>
          <Text style={styles.billAmount}>
            {formatCurrency(CURRENT_USER.dueAmount)}
          </Text>
          <Text style={styles.billDueDate}>Due by Apr 30</Text>
        </Animated.View>

        <Animated.View
          style={[styles.card, styles.halfCard]}
          {...enteringAnimation}
          entering={FadeInDown.delay(250)}
        >
          <View style={styles.noticeHeader}>
            <Text style={styles.cardTitle}>Latest Notices</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3 new</Text>
            </View>
          </View>
          <Text style={styles.noticeText}>
            Maintenance work scheduled for Block A.
          </Text>
        </Animated.View>
      </View>

      <Animated.View
        style={styles.sectionHeader}
        {...enteringAnimation}
        entering={FadeInDown.delay(300)}
      >
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
      </Animated.View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.eventsContainer}
      >
        {events.map((event) => (
          <Animated.View
            key={event.id}
            style={styles.eventCard}
            {...enteringAnimation}
            entering={FadeInDown.delay(350)}
          >
            <TouchableOpacity onPress={() => handleEventPress(event.id)}>
              <Image source={{ uri: event.image }} style={styles.eventImage} />
              <View style={styles.eventDetails}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <View style={styles.eventInfoRow}>
                  <Calendar size={16} color="#666" />
                  <Text style={styles.eventInfo}>{event.date}</Text>
                </View>
                <View style={styles.eventInfoRow}>
                  <Text style={styles.eventInfo}>{event.location}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>

      <Animated.View
        style={styles.sectionHeader}
        {...enteringAnimation}
        entering={FadeInDown.delay(450)}
      >
        <Text style={styles.sectionTitle}>Community Updates</Text>
      </Animated.View>

      <Animated.View
        style={styles.updatesList}
        {...enteringAnimation}
        entering={FadeInDown.delay(500)}
      >
        {updates.map((update) => (
          <TouchableOpacity
            key={update.id}
            style={styles.updateItem}
            onPress={() => handleUpdatePress(update.id)}
          >
            <View style={[styles.updateIconContainer, styles.orangeLight]}>
              <AlertCircle size={20} color="#F97316" />
            </View>
            <View style={styles.updateTextContainer}>
              <Text style={styles.updateTitle}>{update.title}</Text>
              <Text style={styles.updateDescription}>{update.description}</Text>
              <Text style={styles.updateTime}>{update.time}</Text>
            </View>
            <ChevronRight size={20} color="#CBD5E1" />
          </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  greeting: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#111827',
  },
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  quickAction: {
    alignItems: 'center',
    width: '22%',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  purpleLight: {
    backgroundColor: 'rgba(126, 58, 242, 0.1)',
  },
  orangeLight: {
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
  },
  blueLight: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  greenLight: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  quickActionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#4B5563',
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  halfCard: {
    flex: 1,
    marginHorizontal: 4,
  },
  cardTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 8,
  },
  billAmount: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#7E3AF2',
    marginBottom: 4,
  },
  billDueDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  noticeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badge: {
    backgroundColor: '#7E3AF2',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: '#FFFFFF',
  },
  noticeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 20,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
  },
  eventsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  eventCard: {
    width: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 16,
  },
  eventImage: {
    width: '100%',
    height: 140,
  },
  eventDetails: {
    padding: 16,
  },
  eventTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 8,
  },
  eventInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  eventInfo: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: '#6B7280',
    marginLeft: 6,
  },
  updatesList: {
    paddingHorizontal: 20,
  },
  updateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  updateIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  updateTextContainer: {
    flex: 1,
  },
  updateTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    color: '#111827',
    marginBottom: 4,
  },
  updateDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: '#4B5563',
    marginBottom: 4,
    lineHeight: 20,
  },
  updateTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  spacer: {
    height: 40,
  },
});
