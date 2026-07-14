import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Post } from '@/types/post';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  function handleLike() {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  }

  function handlePress() {
    router.push({
      pathname: '/post/[id]',
      params: {
        id: post.id,
        imageUrl: post.imageUrl,
        username: post.username,
        location: post.location,
        likes: likeCount,
        caption: post.caption,
        avatar: post.avatar,
      },
    });
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: post.avatar }} style={styles.avatar} />
        <View style={styles.headerText}>
          <Text style={styles.username}>{post.username}</Text>
          <Text style={styles.location}>{post.location}</Text>
        </View>
        <TouchableOpacity hitSlop={8}>
          <Text style={styles.moreIcon}>•••</Text>
        </TouchableOpacity>
      </View>

      {/* Image */}
      <Pressable onPress={handlePress} onLongPress={handleLike}>
        <Image
          source={{ uri: post.imageUrl }}
          style={styles.postImage}
          resizeMode="cover"
        />
      </Pressable>

      {/* Actions */}
      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <TouchableOpacity onPress={handleLike} style={styles.actionBtn}>
            <Text style={[styles.actionIcon, liked && styles.likedIcon]}>
              {liked ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePress} style={styles.actionBtn}>
            <Text style={styles.actionIcon}>💬</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionIcon}>✈️</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.actionIcon}>🔖</Text>
        </TouchableOpacity>
      </View>

      {/* Likes */}
      <Text style={styles.likesText}>{likeCount.toLocaleString()} Me gusta</Text>

      {/* Caption */}
      <Text style={styles.caption} numberOfLines={2}>
        <Text style={styles.username}>{post.username} </Text>
        {post.caption}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
    borderWidth: 1.5,
    borderColor: '#c13584',
  },
  headerText: {
    flex: 1,
  },
  username: {
    fontWeight: '700',
    fontSize: 13,
    color: '#000',
  },
  location: {
    fontSize: 11,
    color: '#555',
    marginTop: 1,
  },
  moreIcon: {
    fontSize: 14,
    color: '#000',
    letterSpacing: 1,
  },
  postImage: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#efefef',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 4,
  },
  leftActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    padding: 2,
  },
  actionIcon: {
    fontSize: 24,
  },
  likedIcon: {
    transform: [{ scale: 1.1 }],
  },
  likesText: {
    fontWeight: '700',
    fontSize: 13,
    color: '#000',
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  caption: {
    fontSize: 13,
    color: '#000',
    paddingHorizontal: 12,
    paddingBottom: 12,
    lineHeight: 18,
  },
});
