import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { X, Camera, Upload, AlertCircle } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

const ISSUE_TYPES = [
  'Maintenance',
  'Security',
  'Housekeeping',
  'Parking',
  'Others',
];

export default function ReportIssueScreen() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: '',
          headerRight: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <X size={24} color="#000" />
            </TouchableOpacity>
          ),
          headerLeft: () => {
            return <Text style={styles.title}>Report an Issue</Text>;
          },
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeIn.duration(600)} style={styles.header}>
          <Text style={styles.subtitle}>
            Tell us about the problem you're facing
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(600).delay(100)}
          style={styles.form}
        >
          <Text style={styles.label}>Issue Type</Text>
          <View style={styles.issueTypesContainer}>
            {ISSUE_TYPES.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.issueTypeButton,
                  selectedType === type && styles.selectedIssueType,
                ]}
                onPress={() => setSelectedType(type)}
              >
                <Text
                  style={[
                    styles.issueTypeText,
                    selectedType === type && styles.selectedIssueTypeText,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            placeholder="Describe your issue in detail"
            placeholderTextColor="#9CA3AF"
            value={description}
            onChangeText={setDescription}
          />

          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Block A, Floor 2"
            placeholderTextColor="#9CA3AF"
            value={location}
            onChangeText={setLocation}
          />

          <Text style={styles.label}>Add Photos</Text>
          <View style={styles.photoSection}>
            <View style={styles.photoButtons}>
              <TouchableOpacity
                style={styles.photoButton}
                onPress={async () => {
                  try {
                    const result = await ImagePicker.launchCameraAsync({
                      mediaTypes: ImagePicker.MediaTypeOptions.Images,
                      quality: 0.8,
                    });
                    if (!result.canceled && result.assets[0].uri) {
                      setPhotos([...photos, result.assets[0].uri]);
                    }
                  } catch (e) {
                    setError('Failed to take photo');
                  }
                }}
              >
                <Camera size={24} color="#6B7280" />
                <Text style={styles.photoButtonText}>Take Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.photoButton}
                onPress={async () => {
                  try {
                    const result = await ImagePicker.launchImageLibraryAsync({
                      mediaTypes: ImagePicker.MediaTypeOptions.Images,
                      quality: 0.8,
                    });
                    if (!result.canceled && result.assets[0].uri) {
                      setPhotos([...photos, result.assets[0].uri]);
                    }
                  } catch (e) {
                    setError('Failed to pick image');
                  }
                }}
              >
                <Upload size={24} color="#6B7280" />
                <Text style={styles.photoButtonText}>Upload Photo</Text>
              </TouchableOpacity>
            </View>
            {photos.length > 0 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.photoPreviewScroll}
              >
                {photos.map((photo, index) => (
                  <View key={index} style={styles.photoPreview}>
                    <Image
                      source={{ uri: photo }}
                      style={styles.previewImage}
                    />
                    <TouchableOpacity
                      style={styles.removePhotoButton}
                      onPress={() =>
                        setPhotos(photos.filter((_, i) => i !== index))
                      }
                    >
                      <X size={16} color="#fff" />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(600).delay(200)}
          style={styles.buttonContainer}
        >
          {error ? (
            <View style={styles.errorContainer}>
              <AlertCircle size={20} color="#EF4444" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}
          <TouchableOpacity
            style={[
              styles.button,
              (!selectedType || !description || !location) &&
                styles.buttonDisabled,
            ]}
            disabled={
              !selectedType || !description || !location || isSubmitting
            }
            onPress={async () => {
              setIsSubmitting(true);
              setError('');
              try {
                // Here you would implement the actual submission logic
                await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulated API call
                router.back();
              } catch (e) {
                setError('Failed to submit report');
              } finally {
                setIsSubmitting(false);
              }
            }}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Submit Report</Text>
            )}
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#EF4444',
    marginLeft: 8,
    fontSize: 14,
  },
  selectedIssueType: {
    backgroundColor: '#7E3AF2',
  },
  selectedIssueTypeText: {
    color: '#fff',
  },
  photoSection: {
    gap: 16,
  },
  photoPreviewScroll: {
    flexGrow: 0,
  },
  photoPreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 8,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  removePhotoButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    padding: 4,
  },
  buttonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 8,
    marginTop: 16,
  },
  issueTypesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  issueTypeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  issueTypeText: {
    color: '#4B5563',
    fontSize: 14,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
    height: 100,
    textAlignVertical: 'top',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  photoButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  photoButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  photoButtonText: {
    color: '#6B7280',
    fontSize: 14,
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  button: {
    backgroundColor: '#7E3AF2',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
