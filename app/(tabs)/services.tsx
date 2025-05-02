import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { ChevronLeft, Droplet, Zap, Clock, CircleAlert as AlertCircle } from 'lucide-react-native';

export default function ServicesScreen() {
  const activeRequests = [
    {
      id: 1,
      type: 'Water Leakage',
      status: 'In Progress',
      icon: <Droplet size={22} color="#7E3AF2" />,
      time: '2h ago'
    },
    {
      id: 2,
      type: 'Power Fluctuation',
      status: 'Pending',
      icon: <Zap size={22} color="#7E3AF2" />,
      time: '3h ago'
    }
  ];
  
  const serviceCategories = [
    { id: 1, name: 'Plumbing', icon: <Droplet size={24} color="#7E3AF2" /> },
    { id: 2, name: 'Electrical', icon: <Zap size={24} color="#7E3AF2" /> },
    { id: 3, name: 'Cleaning', icon: <AlertCircle size={24} color="#7E3AF2" /> },
    { id: 4, name: 'Security', icon: <AlertCircle size={24} color="#7E3AF2" /> },
    { id: 5, name: 'Maintenance', icon: <AlertCircle size={24} color="#7E3AF2" /> },
    { id: 6, name: 'Others', icon: <AlertCircle size={24} color="#7E3AF2" /> },
  ];
  
  const recentRequests = [
    {
      id: 1,
      type: 'Water Leakage in Kitchen',
      status: 'Pending',
      statusColor: '#F97316',
      time: '2 days ago',
      icon: <Droplet size={18} color="#7E3AF2" />
    },
    {
      id: 2,
      type: 'AC Not Working',
      status: 'In Progress',
      statusColor: '#3B82F6',
      time: '3 days ago',
      icon: <Zap size={18} color="#7E3AF2" />
    },
    {
      id: 3,
      type: 'Lobby Cleaning',
      status: 'Resolved',
      statusColor: '#10B981',
      time: '5 days ago',
      icon: <AlertCircle size={18} color="#7E3AF2" />
    }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View 
        entering={FadeIn.duration(600)}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backButton}>
          <ChevronLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Complaints & Requests</Text>
      </Animated.View>
      
      <Animated.View 
        entering={FadeInDown.duration(600).delay(100)}
        style={styles.section}
      >
        <Text style={styles.sectionTitle}>Active Requests</Text>
        <View style={styles.activeRequestsContainer}>
          {activeRequests.map((request, index) => (
            <TouchableOpacity 
              key={request.id} 
              style={styles.activeRequestCard}
            >
              <View style={styles.requestIconContainer}>
                {request.icon}
              </View>
              <View style={styles.requestInfo}>
                <Text style={styles.requestType}>{request.type}</Text>
                <Text 
                  style={[
                    styles.requestStatus, 
                    request.status === 'In Progress' ? styles.statusInProgress : styles.statusPending
                  ]}
                >
                  {request.status}
                </Text>
              </View>
              <View style={styles.requestTimeContainer}>
                <Clock size={14} color="#94A3B8" />
                <Text style={styles.requestTime}>{request.time}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
      
      <Animated.View 
        entering={FadeInDown.duration(600).delay(200)}
        style={styles.section}
      >
        <Text style={styles.sectionTitle}>Submit New Request</Text>
        <View style={styles.categoriesContainer}>
          {serviceCategories.map((category) => (
            <TouchableOpacity 
              key={category.id} 
              style={styles.categoryCard}
            >
              <View style={styles.categoryIconContainer}>
                {category.icon}
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
      
      <Animated.View 
        entering={FadeInDown.duration(600).delay(300)}
        style={styles.section}
      >
        <Text style={styles.sectionTitle}>Recent Requests</Text>
        <View style={styles.recentRequestsContainer}>
          {recentRequests.map((request) => (
            <TouchableOpacity 
              key={request.id} 
              style={styles.recentRequestItem}
            >
              <View style={styles.recentRequestIcon}>
                {request.icon}
              </View>
              <View style={styles.recentRequestInfo}>
                <Text style={styles.recentRequestType}>{request.type}</Text>
                <View style={styles.requestStatusRow}>
                  <Text 
                    style={[
                      styles.recentRequestStatus, 
                      { color: request.statusColor }
                    ]}
                  >
                    {request.status}
                  </Text>
                  <Text style={styles.recentRequestTime}>{request.time}</Text>
                </View>
              </View>
              <ChevronLeft style={styles.chevronIcon} size={18} color="#CBD5E1" />
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
      
      <Animated.View 
        entering={FadeInDown.duration(600).delay(400)}
        style={styles.createButtonContainer}
      >
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Create New Request</Text>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
  },
  section: {
    marginTop: 16,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 16,
  },
  activeRequestsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activeRequestCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  requestIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(126, 58, 242, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  requestInfo: {
    marginBottom: 12,
  },
  requestType: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#111827',
    marginBottom: 4,
  },
  requestStatus: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  statusInProgress: {
    color: '#3B82F6',
  },
  statusPending: {
    color: '#F97316',
  },
  requestTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requestTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#94A3B8',
    marginLeft: 4,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  categoryCard: {
    width: '30%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  categoryIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(126, 58, 242, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: '#111827',
    textAlign: 'center',
  },
  recentRequestsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  recentRequestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  recentRequestIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(126, 58, 242, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recentRequestInfo: {
    flex: 1,
  },
  recentRequestType: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#111827',
    marginBottom: 4,
  },
  requestStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentRequestStatus: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginRight: 8,
  },
  recentRequestTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#94A3B8',
  },
  chevronIcon: {
    transform: [{ rotate: '180deg' }],
  },
  createButtonContainer: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  createButton: {
    backgroundColor: '#7E3AF2',
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