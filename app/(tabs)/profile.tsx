import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Image } from 'react-native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Settings, User, CreditCard, Lock, Bell, CircleHelp as HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  
  const handleLogout = () => {
    router.replace('/(auth)');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View 
        entering={FadeIn.duration(600)}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Profile</Text>
      </Animated.View>
      
      <Animated.View 
        entering={FadeInDown.duration(600).delay(100)}
        style={styles.profileCard}
      >
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150' }}
          style={styles.profileAvatar}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Alex Johnson</Text>
          <Text style={styles.profileAddress}>Block C, Apartment 507</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </Animated.View>
      
      <Animated.View 
        entering={FadeInDown.duration(600).delay(200)}
        style={styles.section}
      >
        <Text style={styles.sectionTitle}>Account Settings</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <View style={[styles.menuIconContainer, styles.purpleLight]}>
            <User size={20} color="#7E3AF2" />
          </View>
          <Text style={styles.menuItemText}>Personal Information</Text>
          <ChevronRight size={18} color="#CBD5E1" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <View style={[styles.menuIconContainer, styles.greenLight]}>
            <CreditCard size={20} color="#10B981" />
          </View>
          <Text style={styles.menuItemText}>Payment Methods</Text>
          <ChevronRight size={18} color="#CBD5E1" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <View style={[styles.menuIconContainer, styles.blueLight]}>
            <Lock size={20} color="#3B82F6" />
          </View>
          <Text style={styles.menuItemText}>Security</Text>
          <ChevronRight size={18} color="#CBD5E1" />
        </TouchableOpacity>
      </Animated.View>
      
      <Animated.View 
        entering={FadeInDown.duration(600).delay(300)}
        style={styles.section}
      >
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <View style={styles.switchItem}>
          <View style={[styles.menuIconContainer, styles.orangeLight]}>
            <Bell size={20} color="#F97316" />
          </View>
          <Text style={styles.menuItemText}>Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#CBD5E1', true: '#C4B5FD' }}
            thumbColor={notificationsEnabled ? '#7E3AF2' : '#F1F5F9'}
          />
        </View>
        
        <View style={styles.switchItem}>
          <View style={[styles.menuIconContainer, styles.slate]}>
            <Settings size={20} color="#64748B" />
          </View>
          <Text style={styles.menuItemText}>Dark Mode</Text>
          <Switch
            value={darkModeEnabled}
            onValueChange={setDarkModeEnabled}
            trackColor={{ false: '#CBD5E1', true: '#C4B5FD' }}
            thumbColor={darkModeEnabled ? '#7E3AF2' : '#F1F5F9'}
          />
        </View>
      </Animated.View>
      
      <Animated.View 
        entering={FadeInDown.duration(600).delay(400)}
        style={styles.section}
      >
        <Text style={styles.sectionTitle}>Support</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <View style={[styles.menuIconContainer, styles.blueLight]}>
            <HelpCircle size={20} color="#3B82F6" />
          </View>
          <Text style={styles.menuItemText}>Help Center</Text>
          <ChevronRight size={18} color="#CBD5E1" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <View style={[styles.menuIconContainer, styles.slate]}>
            <Settings size={20} color="#64748B" />
          </View>
          <Text style={styles.menuItemText}>Terms & Privacy Policy</Text>
          <ChevronRight size={18} color="#CBD5E1" />
        </TouchableOpacity>
      </Animated.View>
      
      <Animated.View 
        entering={FadeInDown.duration(600).delay(500)}
        style={styles.logoutContainer}
      >
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>
      
      <Animated.View 
        entering={FadeIn.duration(600).delay(600)}
        style={styles.versionContainer}
      >
        <Text style={styles.versionText}>SocietyConnect v1.0.0</Text>
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#111827',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 24,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 4,
  },
  profileAddress: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  editButton: {
    backgroundColor: '#F1F5F9',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  editButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#7E3AF2',
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  purpleLight: {
    backgroundColor: 'rgba(126, 58, 242, 0.1)',
  },
  blueLight: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  greenLight: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  orangeLight: {
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
  },
  slate: {
    backgroundColor: 'rgba(100, 116, 139, 0.1)',
  },
  menuItemText: {
    flex: 1,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#111827',
  },
  switchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  logoutContainer: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    padding: 16,
    borderRadius: 12,
  },
  logoutText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#EF4444',
    marginLeft: 8,
  },
  versionContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#94A3B8',
  },
  spacer: {
    height: 100,
  },
});