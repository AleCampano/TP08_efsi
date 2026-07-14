import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HomeHeader } from '@/components/HomeHeader';
import { PostCard } from '@/components/PostCard';
import { StoriesBar } from '@/components/StoriesBar';
import { getCatPosts } from '@/services/catApi';
import { Post } from '@/types/post';

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCatPosts()
      .then((data) => setPosts(data))
      .catch(() => setError('No se pudieron cargar las publicaciones.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#c13584" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header fijo arriba */}
      <HomeHeader />
      {/* Stories sticky debajo del header, scrollea dentro del FlatList */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
        ListHeaderComponent={<StoriesBar />}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  errorText: {
    color: '#e0245e',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  separator: {
    height: 2,
    backgroundColor: '#fafafa',
  },
});
