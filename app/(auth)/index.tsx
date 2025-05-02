import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { ChevronDown } from 'lucide-react-native';

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
        entering={FadeIn.duration(600)}
        style={styles.logoContainer}
      >
        <Text style={styles.appTitle}>Society Connect</Text>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.duration(700).delay(200)}
        style={styles.formContainer}
      >
        <Text style={styles.welcomeText}>Welcome back</Text>
        <Text style={styles.subText}>Sign in to manage your society</Text>

        <Text style={styles.inputLabel}>Phone Number</Text>
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
          />
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
        </TouchableOpacity>

        <Text style={styles.orText}>or continue with</Text>

        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => handleSocialLogin('Google')}
        >
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
            }}
            style={styles.socialIcon}
          />
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => handleSocialLogin('Apple')}
        >
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
            }}
            style={styles.socialIcon}
          />
          <Text style={styles.socialButtonText}>Continue with Apple</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.Text
        entering={FadeIn.duration(600).delay(400)}
        style={styles.termsText}
      >
        By continuing, you agree to our{' '}
        <Text style={styles.highlightText}>Terms of Service</Text> and{' '}
        <Text style={styles.highlightText}>Privacy Policy</Text>
      </Animated.Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'flex-start',
    marginTop: 60,
    marginBottom: 30,
  },
  appTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#7E3AF2',
  },
  formContainer: {
    flex: 1,
  },
  welcomeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    marginBottom: 8,
    color: '#333',
  },
  subText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  inputLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 24,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
    width: 70,
  },
  countryCodeText: {
    fontFamily: 'Inter-Medium',
    marginRight: 4,
  },
  input: {
    flex: 1,
    padding: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: '#7E3AF2',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  disabledButton: {
    backgroundColor: '#B794F6',
  },
  continueButtonText: {
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    fontSize: 16,
  },
  orText: {
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    color: '#666',
    marginBottom: 24,
  },
  socialButton: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  socialButtonText: {
    fontFamily: 'Inter-Medium',
    color: '#333',
    fontSize: 16,
  },
  termsText: {
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
    fontSize: 12,
  },
  highlightText: {
    color: '#7E3AF2',
    fontFamily: 'Inter-Medium',
  },
});
