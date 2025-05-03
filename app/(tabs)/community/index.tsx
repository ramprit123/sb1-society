import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import {
  Bell,
  Search,
  Filter,
  Calendar,
  MapPin,
  MessageCircle,
  Heart,
  X,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function CommunityScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('events');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    date: 'all',
    type: 'all',
  });

  const filterEvents = (
    events: Array<{
      id: number;
      title: string;
      date: string;
      location: string;
      type: string;
    }>
  ) => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDate =
        selectedFilters.date === 'all'
          ? true
          : selectedFilters.date === 'today'
          ? isToday(new Date(event.date))
          : selectedFilters.date === 'this week'
          ? isThisWeek(new Date(event.date))
          : selectedFilters.date === 'this month'
          ? isThisMonth(new Date(event.date))
          : true;

      const matchesType =
        selectedFilters.type === 'all'
          ? true
          : event.type === selectedFilters.type;

      return matchesSearch && matchesDate && matchesType;
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isThisWeek = (date: Date) => {
    const today = new Date();
    const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));
    const lastDay = new Date(
      today.setDate(today.getDate() - today.getDay() + 6)
    );
    return date >= firstDay && date <= lastDay;
  };

  const isThisMonth = (date: Date) => {
    const today = new Date();
    return (
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const events = [
    {
      id: 1,
      title: 'Annual Society Meeting',
      date: '2024-04-25 19:00',
      location: 'Community Hall',
      attendees: 42,
      type: 'meeting',
      image:
        'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 2,
      title: 'Community Lunch',
      date: '2024-04-28 12:00',
      location: 'Society Garden',
      attendees: 35,
      type: 'social',
      image:
        'https://images.pexels.com/photos/7500307/pexels-photo-7500307.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 3,
      title: 'Yoga Workshop',
      date: '2024-04-30 06:00',
      location: 'Activity Center',
      attendees: 18,
      type: 'sports',
      image:
        'https://images.pexels.com/photos/6698513/pexels-photo-6698513.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ];

  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      author: 'Rahul Shah',
      authorAvatar:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      title: 'Ideas for garden renovation',
      content:
        'I think we should consider adding more native plants to our community garden. It would be more sustainable and attract local wildlife.',
      time: '2 hours ago',
      replies: 8,
      likes: 15,
      category: 'general',
      isLiked: false,
    },
    {
      id: 2,
      author: 'Priya Mehta',
      authorAvatar:
        'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=150',
      title: 'Upcoming tennis tournament',
      content:
        "Hi neighbors! I'm organizing a friendly tennis tournament next month. All levels welcome! Please comment if interested.",
      time: '5 hours ago',
      replies: 12,
      likes: 23,
      category: 'sports',
      isLiked: false,
    },
    {
      id: 3,
      author: 'Amit Patel',
      authorAvatar:
        'https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=150',
      title: 'Parking space issue',
      content:
        'There have been several instances of non-residents using our visitor parking. Should we consider a parking permit system?',
      time: '1 day ago',
      replies: 19,
      likes: 31,
      category: 'maintenance',
      isLiked: false,
    },
  ]);

  const filterDiscussions = () => {
    return discussions.filter((discussion) => {
      const matchesSearch =
        discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        discussion.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        discussion.author.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        selectedFilters.type === 'all'
          ? true
          : discussion.category === selectedFilters.type;

      return matchesSearch && matchesType;
    });
  };

  const handleLikeDiscussion = (id: number) => {
    setDiscussions(
      discussions.map((discussion) => {
        if (discussion.id === id) {
          return {
            ...discussion,
            likes: discussion.isLiked
              ? discussion.likes - 1
              : discussion.likes + 1,
            isLiked: !discussion.isLiked,
          };
        }
        return discussion;
      })
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View entering={FadeIn.duration(600)} style={styles.header}>
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
          <TextInput
            style={styles.searchInput}
            placeholder="Search events, discussions..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#94A3B8"
          />
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilter(true)}
        >
          <Filter size={20} color="#7E3AF2" />
        </TouchableOpacity>

        <Modal
          visible={showFilter}
          transparent
          animationType="fade"
          onRequestClose={() => setShowFilter(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.filterModal}>
              <View style={styles.filterHeader}>
                <Text style={styles.filterTitle}>Filter</Text>
                <TouchableOpacity
                  onPress={() => setShowFilter(false)}
                  style={styles.closeButton}
                >
                  <X size={24} color="#111827" />
                </TouchableOpacity>
              </View>

              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Date</Text>
                <View style={styles.filterOptions}>
                  {['all', 'today', 'this week', 'this month'].map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.filterOption,
                        selectedFilters.date === option &&
                          styles.filterOptionActive,
                      ]}
                      onPress={() =>
                        setSelectedFilters((prev) => ({
                          ...prev,
                          date: option,
                        }))
                      }
                    >
                      <Text
                        style={[
                          styles.filterOptionText,
                          selectedFilters.date === option &&
                            styles.filterOptionTextActive,
                        ]}
                      >
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Type</Text>
                <View style={styles.filterOptions}>
                  {['all', 'meeting', 'social', 'sports', 'other'].map(
                    (option) => (
                      <TouchableOpacity
                        key={option}
                        style={[
                          styles.filterOption,
                          selectedFilters.type === option &&
                            styles.filterOptionActive,
                        ]}
                        onPress={() =>
                          setSelectedFilters((prev) => ({
                            ...prev,
                            type: option,
                          }))
                        }
                      >
                        <Text
                          style={[
                            styles.filterOptionText,
                            selectedFilters.type === option &&
                              styles.filterOptionTextActive,
                          ]}
                        >
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </Text>
                      </TouchableOpacity>
                    )
                  )}
                </View>
              </View>

              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => setShowFilter(false)}
              >
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
              activeTab === 'events' && styles.activeTabText,
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
              activeTab === 'discussions' && styles.activeTabText,
            ]}
          >
            Discussions
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {activeTab === 'events' ? (
        <Animated.View entering={FadeInDown.duration(600).delay(300)}>
          {filterEvents(events).map((event, index) => (
            <TouchableOpacity
              key={event.id}
              style={styles.eventCard}
              onPress={() => router.push(`/community/${event.id}`)}
            >
              <Image
                source={{ uri: (event as any).image }}
                style={styles.eventImage}
              />
              <View style={styles.eventContent}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <View style={styles.eventDetailRow}>
                  <Calendar size={16} color="#6B7280" />
                  <Text style={styles.eventDetailText}>
                    {new Date(event.date).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })}
                  </Text>
                </View>
                <View style={styles.eventDetailRow}>
                  <MapPin size={16} color="#6B7280" />
                  <Text style={styles.eventDetailText}>{event.location}</Text>
                </View>
                <View style={styles.eventFooter}>
                  <View style={styles.attendeesContainer}>
                    <View style={styles.attendeesBadge}>
                      <Text style={styles.attendeesBadgeText}>
                        {(event as any).attendees}
                      </Text>
                    </View>
                    <Text style={styles.attendeesText}>Going</Text>
                  </View>
                  <TouchableOpacity style={styles.interestButton}>
                    <Text style={styles.interestButtonText}>
                      I'm Interested
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => router.push('/community/create-event')}
          >
            <Text style={styles.createButtonText}>Create New Event</Text>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <Animated.View entering={FadeInDown.duration(600).delay(300)}>
          {filterDiscussions().map((discussion, index) => (
            <TouchableOpacity
              key={discussion.id}
              style={styles.discussionCard}
              onPress={() =>
                router.push(`/community/discussion/${discussion.id}`)
              }
            >
              <View style={styles.discussionHeader}>
                <Image
                  source={{ uri: discussion.authorAvatar }}
                  style={styles.authorAvatar}
                />
                <View style={styles.authorInfo}>
                  <Text style={styles.authorName}>{discussion.author}</Text>
                  <Text style={styles.discussionTime}>{discussion.time}</Text>
                </View>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{discussion.category}</Text>
                </View>
              </View>
              <Text style={styles.discussionTitle}>{discussion.title}</Text>
              <Text style={styles.discussionContent}>{discussion.content}</Text>
              <View style={styles.discussionFooter}>
                <TouchableOpacity
                  style={styles.footerItem}
                  onPress={() =>
                    router.push(`/community/discussion/${discussion.id}`)
                  }
                >
                  <MessageCircle size={16} color="#6B7280" />
                  <Text style={styles.footerItemText}>
                    {discussion.replies} Replies
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.footerItem}
                  onPress={() => handleLikeDiscussion(discussion.id)}
                >
                  <Heart
                    size={16}
                    color={discussion.isLiked ? '#EF4444' : '#6B7280'}
                    fill={discussion.isLiked ? '#EF4444' : 'none'}
                  />
                  <Text
                    style={[
                      styles.footerItemText,
                      discussion.isLiked && styles.likedText,
                    ]}
                  >
                    {discussion.likes} Likes
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => router.push('/community/create-discussion')}
          >
            <Text style={styles.createButtonText}>Start New Discussion</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  categoryBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 'auto',
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#4B5563',
    textTransform: 'capitalize',
  },
  likedText: {
    color: '#EF4444',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  filterModal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '80%',
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  filterTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#111827',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterSection: {
    marginBottom: 24,
  },
  filterSectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    marginHorizontal: 6,
    marginBottom: 12,
  },
  filterOptionActive: {
    backgroundColor: '#EDE9FE',
  },
  filterOptionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4B5563',
  },
  filterOptionTextActive: {
    color: '#7E3AF2',
  },
  applyButton: {
    backgroundColor: '#7E3AF2',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  applyButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#111827',
    marginLeft: 8,
  },
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