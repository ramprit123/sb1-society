import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { ArrowLeft } from 'lucide-react-native';

export default function TermsScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View 
        entering={FadeIn.duration(600)}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms & Privacy Policy</Text>
        <View style={{ width: 40 }} />
      </Animated.View>

      <View style={styles.content}>
        <Animated.View
          entering={FadeInDown.duration(600).delay(100)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Terms of Service</Text>
          <Text style={styles.paragraph}>
            Welcome to SocietyConnect. By using our app, you agree to these terms. Please read them carefully.
          </Text>

          <Text style={styles.subTitle}>1. Using our Services</Text>
          <Text style={styles.paragraph}>
            You must follow any policies made available to you within the Services. Don't misuse our Services. For example, don't interfere with our Services or try to access them using a method other than the interface and the instructions that we provide.
          </Text>

          <Text style={styles.subTitle}>2. Your Society Account</Text>
          <Text style={styles.paragraph}>
            To use our services, you need to create an account. You are responsible for maintaining the security of your account and the activities that occur under your account.
          </Text>

          <Text style={styles.subTitle}>3. Privacy and Copyright Protection</Text>
          <Text style={styles.paragraph}>
            Our privacy policies explain how we treat your personal data and protect your privacy when you use our Services. By using our Services, you agree that SocietyConnect can use such data in accordance with our privacy policies.
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(600).delay(200)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Privacy Policy</Text>
          <Text style={styles.paragraph}>
            Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information.
          </Text>

          <Text style={styles.subTitle}>1. Information We Collect</Text>
          <Text style={styles.paragraph}>
            We collect information you provide directly to us, including your name, email address, phone number, and residential details. We also collect information about your usage of the app and device information.
          </Text>

          <Text style={styles.subTitle}>2. How We Use Your Information</Text>
          <Text style={styles.paragraph}>
            We use the information we collect to provide, maintain, and improve our services, communicate with you, and protect our services and users.
          </Text>

          <Text style={styles.subTitle}>3. Information Sharing</Text>
          <Text style={styles.paragraph}>
            We do not share your personal information with third parties except as described in this privacy policy or with your consent.
          </Text>

          <Text style={styles.subTitle}>4. Data Security</Text>
          <Text style={styles.paragraph}>
            We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access.
          </Text>

          <Text style={styles.subTitle}>5. Your Rights</Text>
          <Text style={styles.paragraph}>
            You have the right to access, update, or delete your personal information. You can do this through your account settings or by contacting us.
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(600).delay(300)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.paragraph}>
            If you have any questions about these Terms or Privacy Policy, please contact us at:
          </Text>
          <Text style={styles.contactInfo}>Email: legal@society.com</Text>
          <Text style={styles.contactInfo}>Phone: +91 1234567890</Text>
          <Text style={styles.lastUpdated}>Last updated: April 2024</Text>
        </Animated.View>
      </View>
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
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#111827',
    marginBottom: 16,
  },
  subTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
    marginBottom: 12,
  },
  contactInfo: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#111827',
    marginBottom: 4,
  },
  lastUpdated: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginTop: 16,
    textAlign: 'right',
  },
});