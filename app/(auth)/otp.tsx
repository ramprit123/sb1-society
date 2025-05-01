import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { ChevronLeft } from 'lucide-react-native';

export default function OTPScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef<TextInput[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isResendActive, setIsResendActive] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isResendActive) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsResendActive(true);
    }
  }, [timeLeft, isResendActive]);

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) value = value[value.length - 1];

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }

    // Check if all digits are filled
    if (newOtp.every((digit) => digit !== '') && index === 3) {
      router.replace('/(tabs)');
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResend = () => {
    if (isResendActive) {
      setTimeLeft(30);
      setIsResendActive(false);
      // Handle resend logic here
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <ChevronLeft size={24} color="#333" />
      </Pressable>

      <Animated.View
        entering={FadeIn.duration(600)}
        style={styles.contentContainer}
      >
        <Text style={styles.title}>Verification Code</Text>
        <Text style={styles.description}>
          We've sent a verification code to your phone number.
        </Text>

        <Animated.View
          entering={FadeInDown.duration(700).delay(200)}
          style={styles.otpContainer}
        >
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                if (ref) inputRefs.current[index] = ref;
              }}
              style={styles.otpInput}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="numeric"
              maxLength={1}
              autoFocus={index === 0}
            />
          ))}
        </Animated.View>

        <Pressable
          style={[
            styles.resendButton,
            !isResendActive && styles.resendButtonDisabled,
          ]}
          onPress={handleResend}
          disabled={!isResendActive}
        >
          <Text
            style={[
              styles.resendText,
              !isResendActive && styles.resendTextDisabled,
            ]}
          >
            {isResendActive ? 'Resend code' : `Resend code in ${timeLeft}s`}
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.verifyButton,
            !otp.every((digit) => digit !== '') && styles.verifyButtonDisabled,
          ]}
          onPress={() => router.replace('/(tabs)')}
          disabled={!otp.every((digit) => digit !== '')}
        >
          <Text style={styles.verifyButtonText}>Verify</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  backButton: {
    marginTop: 50,
    padding: 5,
    width: 40,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 20,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    marginBottom: 12,
    color: '#333',
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    lineHeight: 24,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  otpInput: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
  },
  resendButton: {
    alignSelf: 'center',
    padding: 10,
    marginBottom: 40,
  },
  resendButtonDisabled: {
    opacity: 0.7,
  },
  resendText: {
    fontFamily: 'Inter-Medium',
    color: '#7E3AF2',
    fontSize: 16,
  },
  resendTextDisabled: {
    color: '#888',
  },
  verifyButton: {
    backgroundColor: '#7E3AF2',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  verifyButtonDisabled: {
    backgroundColor: '#B794F6',
  },
  verifyButtonText: {
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    fontSize: 16,
  },
});
