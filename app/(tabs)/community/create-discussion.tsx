import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function CreateDiscussionScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const categories = ['General', 'Maintenance', 'Security', 'Events', 'Other'];

  const handleSubmit = async () => {
    if (!title || !content || !category) {
      // Show error
      return;
    }

    setIsLoading(true);
    try {
      // Add your API call here
      // await createDiscussion({ title, content, category });
      router.back();
    } catch (error) {
      console.error('Error creating discussion:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View 
        entering={FadeIn.duration(300)}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Discussion</Text>
        <View style={{ width: 40 }} />
      </Animated.View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter discussion title"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Content</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={content}
            onChangeText={setContent}
            placeholder="Share your thoughts..."
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={6}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.categoryContainer}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryButton,
                  category === cat && styles.categoryButtonActive
                ]}
                onPress={() => setCategory(cat)}
              >
                <Text style={[
                  styles.categoryButtonText,
                  category === cat && styles.categoryButtonTextActive
                ]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.imageUpload}>
          <ImageIcon size={24} color="#6B7280" />
          <Text style={styles.imageUploadText}>Add Image (Optional)</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={styles.submitButtonText}>
            {isLoading ? 'Creating...' : 'Create Discussion'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  categoryButtonActive: {
    backgroundColor: '#7E3AF2',
  },
  categoryButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4B5563',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
  imageUpload: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    marginTop: 8,
  },
  imageUploadText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 8,
  },
  footer: {
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  submitButton: {
    backgroundColor: '#7E3AF2',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#93C5FD',
  },
  submitButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});