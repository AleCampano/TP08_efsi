import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Comentarios simulados
const MOCK_COMMENTS = [
  { id: '1', username: 'michi_lover', text: 'Qué lindo! 😍', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: '2', username: 'cat.world', text: 'Me encanta este gatito 🐱', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: '3', username: 'fluffy_paws', text: '❤️❤️❤️', avatar: 'https://i.pravatar.cc/150?img=7' },
  { id: '4', username: 'meow.daily', text: 'Un angelito 🥹', avatar: 'https://i.pravatar.cc/150?img=9' },
  { id: '5', username: 'gatito_fan', text: 'Lo quiero adoptar ya!!', avatar: 'https://i.pravatar.cc/150?img=11' },
];

export default function PostDetailScreen() {
  const params = useLocalSearchParams<{
    id: string;
    imageUrl: string;
    username: string;
    location: string;
    likes: string;
    caption: string;
    avatar: string;
  }>();

  const navigation = useNavigation();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Number(params.likes ?? 0));

  useEffect(() => {
    navigation.setOptions({ title: params.username ?? 'Publicación' });
  }, [navigation, params.username]);

  function handleLike() {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header del post */}
      <View style={styles.header}>
        <Image source={{ uri: params.avatar }} style={styles.avatar} />
        <View style={styles.headerText}>
          <Text style={styles.username}>{params.username}</Text>
          <Text style={styles.location}>{params.location}</Text>
        </View>
      </View>

      {/* Imagen en alta definición */}
      <Image
        source={{ uri: params.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Acciones */}
      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <TouchableOpacity onPress={handleLike} style={styles.actionBtn}>
            <Text style={styles.actionIcon}>{liked ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
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
      <Text style={styles.caption}>
        <Text style={styles.username}>{params.username} </Text>
        {params.caption}
      </Text>

      {/* Separador */}
      <View style={styles.divider} />

      {/* Comentarios */}
      <Text style={styles.commentsTitle}>Comentarios</Text>
      {MOCK_COMMENTS.map((comment) => (
        <View key={comment.id} style={styles.comment}>
          <Image source={{ uri: comment.avatar }} style={styles.commentAvatar} />
          <Text style={styles.commentText}>
            <Text style={styles.username}>{comment.username} </Text>
            {comment.text}
          </Text>
        </View>
      ))}

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#efefef',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 4,
  },
  leftActions: {
    flexDirection: 'row',
    gap: 14,
  },
  actionBtn: {
    padding: 2,
  },
  actionIcon: {
    fontSize: 26,
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
    paddingBottom: 8,
    lineHeight: 18,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#dbdbdb',
    marginVertical: 8,
    marginHorizontal: 12,
  },
  commentsTitle: {
    fontWeight: '700',
    fontSize: 13,
    color: '#000',
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 12,
    marginBottom: 12,
    gap: 10,
  },
  commentAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  commentText: {
    flex: 1,
    fontSize: 13,
    color: '#000',
    lineHeight: 18,
  },
  bottomSpacing: {
    height: 40,
  },
});
