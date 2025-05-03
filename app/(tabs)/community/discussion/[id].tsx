import { useLocalSearchParams, router } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  Send,
} from 'lucide-react-native';

export default function DiscussionDetailScreen() {
  const { id } = useLocalSearchParams();
  const [comment, setComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  // In a real app, fetch discussion details based on id
  const discussion = {
    id: 1,
    author: 'Rahul Shah',
    authorAvatar:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    title: 'Ideas for garden renovation',
    content:
      'I think we should consider adding more native plants to our community garden. It would be more sustainable and attract local wildlife.',
    time: '2 hours ago',
    category: 'general',
    likes: 15,
    comments: [
      {
        id: 1,
        author: 'Priya Mehta',
        authorAvatar:
          'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=150',
        content: 'Great idea! We could also add some butterfly-attracting plants.',
        time: '1 hour ago',
        likes: 5,
      },
      {
        id: 2,
        author: 'Amit Patel',
        authorAvatar:
          'https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=150',
        content:
          'I can help with the planting. I have some experience with native gardens.',
        time: '30 minutes ago',
        likes: 3,
      },
    ],
  };

  const handleComment = () => {
    if (comment.trim()) {
      // In a real app, send comment to backend
      setComment('');
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeIn.duration(600)} style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton}>
          <Share2 size={24} color="#111827" />
        </TouchableOpacity>
      </Animated.View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.duration(600).delay(100)}>
          <View style={styles.authorContainer}>
            <Image
              source={{ uri: discussion.authorAvatar }}
              style={styles.authorAvatar}
            />
            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>{discussion.author}</Text>
              <Text style={styles.postTime}>{discussion.time}</Text>
            </View>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{discussion.category}</Text>
            </View>
          </View>

          <Text style={styles.title}>{discussion.title}</Text>
          <Text style={styles.discussionContent}>{discussion.content}</Text>

          <View style={styles.interactionBar}>
            <TouchableOpacity
              style={styles.interactionButton}
              onPress={handleLike}
            >
              <Heart
                size={20}
                color={isLiked ? '#EF4444' : '#6B7280'}
                fill={isLiked ? '#EF4444' : 'none'}
              />
              <Text
                style={[
                  styles.interactionText,
                  isLiked && styles.likedText,
                ]}
              >
                {discussion.likes} Likes
              </Text>
            </TouchableOpacity>
            <View style={styles.interactionButton}>
              <MessageCircle size={20} color="#6B7280" />
              <Text style={styles.interactionText}>
                {discussion.comments.length} Comments
              </Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(600).delay(200)}>
          <Text style={styles.commentsTitle}>Comments</Text>
          {discussion.comments.map((comment) => (
            <View key={comment.id} style={styles.commentCard}>
              <Image
                source={{ uri: comment.authorAvatar }}
                style={styles.commentAuthorAvatar}
              />
              <View style={styles.commentContent}>
                <View style={styles.commentHeader}>
                  <Text style={styles.commentAuthorName}>
                    {comment.author}
                  </Text>
                  <Text style={styles.commentTime}>{comment.time}</Text>
                </View>
                <Text style={styles.commentText}>{comment.content}</Text>
                <View style={styles.commentFooter}>
                  <TouchableOpacity style={styles.commentLikeButton}>
                    <Heart size={16} color="#6B7280" />
                    <Text style={styles.commentLikeCount}>
                      {comment.likes}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </Animated.View>
      </ScrollView>

      <Animated.View
        entering={FadeInDown.duration(600).delay(300)}
        style={styles.commentInput}
      >
        <TextInput
          style={styles.input}
          placeholder="Write a comment..."
          value={comment}
          onChangeText={setComment}
          multiline
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleComment}
        >
          <Send size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </Animated.View>
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
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  authorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
  },
  postTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  categoryBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#4B5563',
    textTransform: 'capitalize',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#111827',
    marginBottom: 12,
  },
  discussionContent: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
    marginBottom: 20,
  },
  interactionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 24,
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  interactionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  likedText: {
    color: '#EF4444',
  },
  commentsTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  commentCard: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  commentAuthorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  commentAuthorName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#111827',
  },
  commentTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  commentText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  commentFooter: {
    flexDirection: 'row',
    marginTop: 8,
  },
  commentLikeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentLikeCount: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  commentInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  input: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#111827',
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#7E3AF2',
    justifyContent: 'center',
    alignItems: 'center',
  },
});