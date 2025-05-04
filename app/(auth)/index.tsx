import { router } from 'expo-router';
import { ArrowRight, ChevronDown, Phone } from 'lucide-react-native';
import { useState } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleContinue = () => {
    if (phoneNumber.length >= 10) {
      router.push('/otp');
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    router.replace('/(tabs)/home');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Animated.View
        entering={FadeIn.duration(1000)}
        style={styles.backgroundImageContainer}
      >
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1628133287836-40bd5453bed1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
          style={styles.backgroundImage}
        />
        <View style={styles.overlay} />
      </Animated.View>

      <Animated.View
        entering={FadeInDown.duration(1000).delay(200)}
        style={styles.logoContainer}
      >
        <Text style={styles.appTitle}>Nicon Infinity A&B</Text>
        <Text style={styles.appSubtitle}>Your Community, Connected</Text>
      </Animated.View>

      <Animated.View
        entering={FadeInUp.duration(1000).delay(400)}
        style={styles.formContainer}
      >
        <Text style={styles.welcomeText}>Welcome back</Text>
        <Text style={styles.subText}>Sign in to manage your society</Text>

        <View style={styles.inputContainer}>
          <Phone size={20} color="#7E3AF2" style={styles.inputIcon} />
          <View style={styles.phoneInputContainer}>
            <TouchableOpacity style={styles.countryCode}>
              <Text style={styles.countryCodeText}>+91</Text>
              <ChevronDown size={16} color="#666" />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              maxLength={10}
              placeholderTextColor="#94A3B8"
            />
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.continueButton,
            phoneNumber.length < 10 && styles.disabledButton,
          ]}
          onPress={handleContinue}
          disabled={phoneNumber.length < 10}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
          <ArrowRight size={20} color="#FFF" />
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.orText}>or continue with</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialLogin('Google')}
          >
            <Image
              source={require('@/assets/images/google-icon.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialLogin('Apple')}
          >
            <Image
              source={require('@/assets/images/apple-black.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.termsText}>
          By continuing, you agree to our{' '}
          <Text style={styles.highlightText}>Terms of Service</Text> and{' '}
          <Text style={styles.highlightText}>Privacy Policy</Text>
        </Text>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 30,
  },
  appTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  appSubtitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  welcomeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    marginBottom: 8,
    color: '#1F2937',
  },
  subText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputIcon: {
    position: 'absolute',
    left: 16,
    top: 14,
    zIndex: 1,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F8FAFC',
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
    width: 80,
    marginLeft: 40,
  },
  countryCodeText: {
    fontFamily: 'Inter-Medium',
    marginRight: 4,
    color: '#1F2937',
  },
  input: {
    flex: 1,
    padding: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1F2937',
  },
  continueButton: {
    backgroundColor: '#7E3AF2',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 32,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#C4B5FD',
  },
  continueButtonText: {
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    fontSize: 16,
    marginRight: 8,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  orText: {
    fontFamily: 'Inter-Regular',
    color: '#94A3B8',
    marginHorizontal: 16,
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
    gap: 16,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  termsText: {
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 12,
    lineHeight: 18,
  },
  highlightText: {
    color: '#7E3AF2',
    fontFamily: 'Inter-Medium',
  },
});
