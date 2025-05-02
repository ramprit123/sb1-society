import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { ArrowLeft, ChevronDown, ChevronUp, MessageCircle, Phone, Mail } from 'lucide-react-native';

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export default function HelpCenterScreen() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const faqs: FAQItem[] = [
    {
      id: '1',
      question: 'How do I pay my maintenance dues?',
      answer: 'You can pay your maintenance dues through the app using various payment methods including cards, UPI, or net banking. Go to the Home screen and click on "Pay Dues" to proceed with the payment.',
    },
    {
      id: '2',
      question: 'How to register a complaint?',
      answer: 'To register a complaint, go to the Home screen and click on "Report Issue". Fill in the required details about your complaint and submit. You can track the status of your complaint in the same section.',
    },
    {
      id: '3',
      question: 'How to book society amenities?',
      answer: 'You can book society amenities like the clubhouse, gym, or swimming pool through the app. Go to the Home screen and click on "Book Amenity". Select the amenity, preferred date and time, and confirm your booking.',
    },
    {
      id: '4',
      question: 'How to update my profile information?',
      answer: 'To update your profile information, go to the Profile tab and click on "Personal Information". Here you can update your contact details, address, and other personal information.',
    },
  ];

  const toggleFAQ = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View 
        entering={FadeIn.duration(600)}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help Center</Text>
        <View style={{ width: 40 }} />
      </Animated.View>

      <View style={styles.content}>
        <Animated.View
          entering={FadeInDown.duration(600).delay(100)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {faqs.map((faq, index) => (
            <Animated.View
              key={faq.id}
              entering={FadeInDown.duration(600).delay(150 + index * 50)}
              style={styles.faqItem}
            >
              <TouchableOpacity
                style={styles.faqHeader}
                onPress={() => toggleFAQ(faq.id)}
              >
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                {expandedId === faq.id ? (
                  <ChevronUp size={20} color="#64748B" />
                ) : (
                  <ChevronDown size={20} color="#64748B" />
                )}
              </TouchableOpacity>
              {expandedId === faq.id && (
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
              )}
            </Animated.View>
          ))}
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(600).delay(400)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Contact Support</Text>
          
          <TouchableOpacity style={styles.contactOption}>
            <View style={[styles.iconContainer, styles.purpleLight]}>
              <MessageCircle size={24} color="#7E3AF2" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>Chat with Us</Text>
              <Text style={styles.contactDescription}>Available 24/7</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactOption}>
            <View style={[styles.iconContainer, styles.greenLight]}>
              <Phone size={24} color="#10B981" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>Call Support</Text>
              <Text style={styles.contactDescription}>Mon-Sat, 9AM-6PM</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactOption}>
            <View style={[styles.iconContainer, styles.blueLight]}>
              <Mail size={24} color="#3B82F6" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>Email Us</Text>
              <Text style={styles.contactDescription}>support@society.com</Text>
            </View>
          </TouchableOpacity>
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
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  faqItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  faqQuestion: {
    flex: 1,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#111827',
    marginRight: 16,
  },
  faqAnswer: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    padding: 16,
    paddingTop: 0,
  },
  contactOption: {
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
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  purpleLight: {
    backgroundColor: 'rgba(126, 58, 242, 0.1)',
  },
  greenLight: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  blueLight: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  contactDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
})