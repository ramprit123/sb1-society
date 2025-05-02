import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Bell, Search, Filter, Calendar, MapPin, MessageCircle, Heart } from 'lucide-react-native';

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState('events');
  
  const events = [
    {
      id: 1,
      title: 'Annual Society Meeting',
      date: 'Apr 25, 7:00 PM',
      location: 'Community Hall',
      attendees: 42,
      image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 2,
      title: 'Community Lunch',
      date: 'Apr 28, 12:00 PM',
      location: 'Society Garden',
      attendees: 35,
      image: 'https://images.pexels.com/photos/7500307/pexels-photo-7500307.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 3,
      title: 'Yoga Workshop',
      date: 'Apr 30, 6:00 AM',
      location: 'Activity Center',
      attendees: 18,
      image: 'https://images.pexels.com/photos/6698513/pexels-photo-6698513.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];
  
  const discussions = [
    {
      id: 1,
      author: 'Rahul Shah',
      authorAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      title: 'Ideas for garden renovation',
      content: 'I think we should consider adding more native plants to our community garden. It would be more sustainable and attract local wildlife.',
      time: '2 hours ago',
      replies: 8,
      likes: 15
    },
    {
      id: 2,
      author: 'Priya Mehta',
      authorAvatar: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=150',
      title: 'Upcoming tennis tournament',
      content: 'Hi neighbors! I\'m organizing a friendly tennis tournament next month. All levels welcome! Please comment if interested.',
      time: '5 hours ago',
      replies: 12,
      likes: 23
    },
    {
      id: 3,
      author: 'Amit Patel',
      authorAvatar: 'https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=150',
      title: 'Parking space issue',
      content: 'There have been several instances of non-residents using our visitor parking. Should we consider a parking permit system?',
      time: '1 day ago',
      replies: 19,
      likes: 31
    }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View 
        entering={FadeIn.duration(600)}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Community</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color="#111827" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </Animated.View>
      
      <Animated.View 
        entering={FadeIn.duration(600).delay(100)}
        style={styles.searchContainer}
      >
        <View style={styles.searchBar}>
          <Search size={20} color="#94A3B8" />
          <Text style={styles.searchPlaceholder}>Search events, discussions...</Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#7E3AF2" />
        </TouchableOpacity>
      </Animated.View>
      
      <Animated.View 
        entering={FadeIn.duration(600).delay(200)}
        style={styles.tabContainer}
      >
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'events' && styles.activeTab]}
          onPress={() => setActiveTab('events')}
        >
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'events' && styles.activeTabText
            ]}
          >
            Events
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'discussions' && styles.activeTab]}
          onPress={() => setActiveTab('discussions')}
        >
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'discussions' && styles.activeTabText
            ]}
          >
            Discussions
          </Text>
        </TouchableOpacity>
      </Animated.View>
      
      {activeTab === 'events' ? (
        <Animated.View entering={FadeInDown.duration(600).delay(300)}>
          {events.map((event, index) => (
            <TouchableOpacity 
              key={event.id} 
              style={styles.eventCard}
            >
              <Image source={{ uri: event.image }} style={styles.eventImage} />
              <View style={styles.eventContent}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <View style={styles.eventDetailRow}>
                  <Calendar size={16} color="#6B7280" />
                  <Text style={styles.eventDetailText}>{event.date}</Text>
                </View>
                <View style={styles.eventDetailRow}>
                  <MapPin size={16} color="#6B7280" />
                  <Text style={styles.eventDetailText}>{event.location}</Text>
                </View>
                <View style={styles.eventFooter}>
                  <View style={styles.attendeesContainer}>
                    <View style={styles.attendeesBadge}>
                      <Text style={styles.attendeesBadgeText}>{event.attendees}</Text>
                    </View>
                    <Text style={styles.attendeesText}>Going</Text>
                  </View>
                  <TouchableOpacity style={styles.interestButton}>
                    <Text style={styles.interestButtonText}>I'm Interested</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.createButton}>
            <Text style={styles.createButtonText}>Create New Event</Text>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <Animated.View entering={FadeInDown.duration(600).delay(300)}>
          {discussions.map((discussion, index) => (
            <TouchableOpacity 
              key={discussion.id} 
              style={styles.discussionCard}
            >
              <View style={styles.discussionHeader}>
                <Image source={{ uri: discussion.authorAvatar }} style={styles.authorAvatar} />
                <View style={styles.authorInfo}>
                  <Text style={styles.authorName}>{discussion.author}</Text>
                  <Text style={styles.discussionTime}>{discussion.time}</Text>
                </View>
              </View>
              <Text style={styles.discussionTitle}>{discussion.title}</Text>
              <Text style={styles.discussionContent}>{discussion.content}</Text>
              <View style={styles.discussionFooter}>
                <View style={styles.footerItem}>
                  <MessageCircle size={16} color="#6B7280" />
                  <Text style={styles.footerItemText}>{discussion.replies} Replies</Text>
                </View>
                <View style={styles.footerItem}>
                  <Heart size={16} color="#6B7280" />
                  <Text style={styles.footerItemText}>{discussion.likes} Likes</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.createButton}>
            <Text style={styles.createButtonText}>Start New Discussion</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      
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
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#111827',
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EF4444',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 12,
  },
  searchPlaceholder: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#94A3B8',
    marginLeft: 8,
  },
  filterButton: {
    width: 42,
    height: 42,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 8,
    borderRadius: 30,
    backgroundColor: '#F1F5F9',
  },
  activeTab: {
    backgroundColor: '#7E3AF2',
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4B5563',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  eventImage: {
    width: '100%',
    height: 150,
  },
  eventContent: {
    padding: 16,
  },
  eventTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 12,
  },
  eventDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventDetailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  attendeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeesBadge: {
    backgroundColor: '#EDE9FE',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 8,
  },
  attendeesBadgeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#7E3AF2',
  },
  attendeesText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  interestButton: {
    backgroundColor: '#F1F5F9',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  interestButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#7E3AF2',
  },
  discussionCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  discussionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#111827',
  },
  discussionTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  discussionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 8,
  },
  discussionContent: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
    marginBottom: 16,
  },
  discussionFooter: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  footerItemText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 6,
  },
  createButton: {
    backgroundColor: '#7E3AF2',
    marginHorizontal: 20,
    marginTop: 24,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  createButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  spacer: {
    height: 100,
  },
});