import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';

// Corrected import for lucide-react-native icons
import {
  Wallet as LucideWallet,
  CircleAlert as LucideAlertCircle,
  UserPlus as LucideUserPlus,
  Calendar as LucideCalendar,
  Users as LucideUsers,
} from 'lucide-react-native';

import { formatCurrency } from '@/utils/formatters';

const CURRENT_USER = {
  name: 'Alex',
  avatar:
    'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
  dueAmount: 2450,
  dueDate: '2024-04-30',
};

export default function HomeScreen() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View entering={FadeIn.duration(600)} style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome, {CURRENT_USER.name}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
        <TouchableOpacity>
          <Image source={{ uri: CURRENT_USER.avatar }} style={styles.avatar} />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.duration(600).delay(100)}
        style={styles.quickActionsContainer}
      >
        <TouchableOpacity style={styles.quickAction}>
          <View style={[styles.iconContainer, styles.purpleLight]}>
            <LucideWallet size={24} color="#7E3AF2" />
          </View>
          <Text style={styles.quickActionText}>Pay Dues</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickAction}>
          <View style={[styles.iconContainer, styles.orangeLight]}>
            <LucideAlertCircle size={24} color="#F97316" />
          </View>
          <Text style={styles.quickActionText}>Report Issue</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickAction}>
          <View style={[styles.iconContainer, styles.blueLight]}>
            <LucideUserPlus size={24} color="#3B82F6" />
          </View>
          <Text style={styles.quickActionText}>Invite Guest</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickAction}>
          <View style={[styles.iconContainer, styles.greenLight]}>
            <LucideCalendar size={24} color="#10B981" />
          </View>
          <Text style={styles.quickActionText}>Book Amenity</Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.rowContainer}>
        <Animated.View
          entering={FadeInDown.duration(600).delay(200)}
          style={[styles.card, styles.halfCard]}
        >
          <Text style={styles.cardTitle}>Pending Bills</Text>
          <Text style={styles.billAmount}>
            {formatCurrency(CURRENT_USER.dueAmount)}
          </Text>
          <Text style={styles.billDueDate}>Due by Apr 30</Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(600).delay(250)}
          style={[styles.card, styles.halfCard]}
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
        entering={FadeInDown.duration(600).delay(300)}
        style={styles.sectionHeader}
      >
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
      </Animated.View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.eventsContainer}
      >
        <Animated.View
          entering={FadeInDown.duration(600).delay(350)}
          style={styles.eventCard}
        >
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=600',
            }}
            style={styles.eventImage}
          />
          <View style={styles.eventDetails}>
            <Text style={styles.eventTitle}>Annual Society Meeting</Text>
            <View style={styles.eventInfoRow}>
              <LucideCalendar size={16} color="#666" />
              <Text style={styles.eventInfo}>Apr 25, 7:00 PM</Text>
            </View>
            <View style={styles.eventInfoRow}>
              <Text style={styles.eventInfo}>Community Hall</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(600).delay(400)}
          style={styles.eventCard}
        >
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/7500307/pexels-photo-7500307.jpeg?auto=compress&cs=tinysrgb&w=600',
            }}
            style={styles.eventImage}
          />
          <View style={styles.eventDetails}>
            <Text style={styles.eventTitle}>Community Lunch</Text>
            <View style={styles.eventInfoRow}>
              <LucideCalendar size={16} color="#666" />
              <Text style={styles.eventInfo}>Apr 28, 12:00 PM</Text>
            </View>
            <View style={styles.eventInfoRow}>
              <Text style={styles.eventInfo}>Society Garden</Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      <Animated.View
        entering={FadeInDown.duration(600).delay(450)}
        style={styles.sectionHeader}
      >
        <Text style={styles.sectionTitle}>Community Updates</Text>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.duration(600).delay(500)}
        style={styles.updatesList}
      >
        <TouchableOpacity style={styles.updateItem}>
          <View style={[styles.updateIconContainer, styles.orangeLight]}>
            <LucideAlertCircle size={20} color="#F97316" />
          </View>
          <View style={styles.updateTextContainer}>
            <Text style={styles.updateTitle}>Water Supply Notice</Text>
            <Text style={styles.updateDescription}>
              Scheduled maintenance on Apr 24, 10 PM - 11 PM
            </Text>
            <Text style={styles.updateTime}>2 hours ago</Text>
          </View>
          <View style={styles.chevron} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.updateItem}>
          <View style={[styles.updateIconContainer, styles.purpleLight]}>
            <LucideCalendar size={20} color="#7E3AF2" />
          </View>
          <View style={styles.updateTextContainer}>
            <Text style={styles.updateTitle}>New Activity Center Timings</Text>
            <Text style={styles.updateDescription}>
              Updated hours: 6 AM - 10 PM
            </Text>
            <Text style={styles.updateTime}>1 day ago</Text>
          </View>
          <View style={styles.chevron} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.updateItem}>
          <View style={[styles.updateIconContainer, styles.blueLight]}>
            <LucideUsers size={20} color="#3B82F6" />
          </View>
          <View style={styles.updateTextContainer}>
            <Text style={styles.updateTitle}>New Resident Welcome</Text>
            <Text style={styles.updateDescription}>
              Welcome to Sarah & Family in Block B, Apt 402
            </Text>
            <Text style={styles.updateTime}>2 days ago</Text>
          </View>
          <View style={styles.chevron} />
        </TouchableOpacity>
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
    paddingTop: 60,
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
  chevron: {
    // This was an empty View, likely intended for a chevron icon or visual indicator.
    // Since there's no actual content or style for a visual chevron,
    // I'll keep it as is, but you might want to add an icon here.
    width: 6,
    height: 12,
    marginLeft: 12,
    alignSelf: 'center',
  },
  spacer: {
    height: 40,
  },
});
