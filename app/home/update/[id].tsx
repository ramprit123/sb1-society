import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ChevronLeft, CircleAlert as AlertCircle, Calendar, Phone } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

const updates = [
  {
    id: 1,
    title: 'Water Supply Notice',
    description: 'Scheduled maintenance on Apr 24, 10 PM - 11 PM',
    time: '2 hours ago',
    type: 'maintenance',
    fullDescription: 'Due to essential maintenance work on the main water supply line, there will be no water supply during the specified time. Please store water in advance. Emergency water tankers will be available if needed.',
    affectedAreas: ['Block A', 'Block B', 'Block C'],
    contactPerson: 'Mr. Sharma (Maintenance Head)',
    contactNumber: '+91 98765 43210'
  },
  {
    id: 2,
    title: 'New Activity Center Timings',
    description: 'Updated hours: 6 AM - 10 PM',
    time: '1 day ago',
    type: 'announcement',
    fullDescription: 'Based on resident feedback, we have extended the Activity Center timing. New rules and regulations have been put in place to ensure everyone\'s safety and comfort.',
    newTimings: {
      weekdays: '6:00 AM - 10:00 PM',
      weekends: '5:30 AM - 11:00 PM'
    },
    rules: [
      'Please carry your resident ID',
      'Maximum 2 guests allowed per resident',
      'Prior booking required for groups',
      'Please maintain cleanliness'
    ]
  }
];

export default function UpdateDetailScreen() {
  const { id } = useLocalSearchParams();
  const update = updates.find(u => u.id === Number(id));

  if (!update) {
    return (
      <View style={styles.container}>
        <Text>Update not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Animated.View 
        entering={FadeIn.duration(600)}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{update.title}</Text>
      </Animated.View>

      <Animated.View 
        entering={FadeIn.duration(600).delay(100)}
        style={styles.content}
      >
        <View style={styles.timeContainer}>
          <Calendar size={16} color="#6B7280" />
          <Text style={styles.timeText}>{update.time}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.description}>{update.fullDescription}</Text>
        </View>

        {update.id === 1 ? (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Affected Areas</Text>
              {update.affectedAreas.map((area, index) => (
                <View key={index} style={styles.listItem}>
                  <AlertCircle size={16} color="#F97316" />
                  <Text style={styles.listItemText}>{area}</Text>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Emergency Contact</Text>
              <View style={styles.contactCard}>
                <Text style={styles.contactName}>{update.contactPerson}</Text>
                <TouchableOpacity style={styles.phoneButton}>
                  <Phone size={16} color="#7E3AF2" />
                  <Text style={styles.phoneButtonText}>{update.contactNumber}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>New Timings</Text>
              <View style={styles.timingCard}>
                <View style={styles.timingRow}>
                  <Text style={styles.timingLabel}>Weekdays</Text>
                  <Text style={styles.timingValue}>{update.newTimings.weekdays}</Text>
                </View>
                <View style={styles.timingRow}>
                  <Text style={styles.timingLabel}>Weekends</Text>
                  <Text style={styles.timingValue}>{update.newTimings.weekends}</Text>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Rules & Guidelines</Text>
              {update.rules.map((rule, index) => (
                <View key={index} style={styles.listItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.listItemText}>{rule}</Text>
                </View>
              ))}
            </View>
          </>
        )}
      </Animated.View>
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
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    flex: 1,
  },
  content: {
    padding: 20,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  timeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  section: {
    marginBottom: 24,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 12,
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
    fontSize: 14,
    color: '#4B5563',
    marginLeft: 8,
    flex: 1,
  },
  contactCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
  },
  contactName: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: '#111827',
    marginBottom: 8,
  },
  phoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#7E3AF2',
    marginLeft: 8,
  },
  timingCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
  },
  timingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timingLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  timingValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#111827',
  },
});