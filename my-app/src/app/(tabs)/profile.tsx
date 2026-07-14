import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getCatPosts } from '@/services/catApi';
import { Post } from '@/types/post';

const NUM_COLUMNS = 3;
const GAP = 1; // px entre columnas

// Datos del perfil simulado
const PROFILE = {
  username: 'gatito_feliz',
  name: 'Michi Gatuno 🐱',
  bio: 'Fan de los gatos 🐾 | Fotógrafo felino | Buenos Aires, ARG',
  avatar: 'https://i.pravatar.cc/150?img=12',
  posts: 24,
  followers: 1842,
  following: 312,
};

export default function ProfileScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions(); // reactivo al tamaño real del viewport
  const itemSize = (width - GAP * (NUM_COLUMNS - 1)) / NUM_COLUMNS;

  const [gridPosts, setGridPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCatPosts()
      .then((data) => setGridPosts(data))
      .finally(() => setLoading(false));
  }, []);

  function handlePostPress(post: Post) {
    router.push({
      pathname: '/post/[id]',
      params: {
        id: post.id,
        imageUrl: post.imageUrl,
        username: PROFILE.username,
        location: 'Buenos Aires, Argentina',
        likes: post.likes,
        caption: post.caption,
        avatar: PROFILE.avatar,
      },
    });
  }

  const ProfileHeader = () => (
    <View>
      <View style={styles.profileSection}>
        <Image source={{ uri: PROFILE.avatar }} style={styles.avatar} />
        <View style={styles.statsContainer}>
          <StatItem value={PROFILE.posts} label="Publicaciones" />
          <StatItem value={PROFILE.followers.toLocaleString()} label="Seguidores" />
          <StatItem value={PROFILE.following} label="Seguidos" />
        </View>
      </View>

      <Text style={styles.name}>{PROFILE.name}</Text>
      <Text style={styles.bio}>{PROFILE.bio}</Text>

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Editar perfil</Text>
      </TouchableOpacity>

      {/* Íconos de grilla / reels / etiquetados (decorativos) */}
      <View style={styles.tabsRow}>
        <View style={[styles.tabItem, styles.tabItemActive]}>
          <Text style={styles.tabIcon}>⊞</Text>
        </View>
        <View style={styles.tabItem}>
          <Text style={styles.tabIcon}>▷</Text>
        </View>
        <View style={styles.tabItem}>
          <Text style={styles.tabIcon}>◻</Text>
        </View>
      </View>

      <View style={styles.divider} />
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.centered} edges={['top']}>
        <ActivityIndicator size="large" color="#c13584" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>{PROFILE.username}</Text>
        <TouchableOpacity hitSlop={8}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={gridPosts}
        keyExtractor={(item) => item.id}
        numColumns={NUM_COLUMNS}
        ListHeaderComponent={<ProfileHeader />}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => handlePostPress(item)}
            style={[
              {
                width: itemSize,
                height: itemSize,
              },
              // Gap horizontal: agrega margen derecho a las dos primeras de cada fila
              (index % NUM_COLUMNS) < NUM_COLUMNS - 1 && { marginRight: GAP },
            ]}>
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.gridImage}
              resizeMode="cover"
            />
          </Pressable>
        )}
        // Gap vertical entre filas
        ItemSeparatorComponent={() => <View style={{ height: GAP }} />}
        showsVerticalScrollIndicator={false}
        // Necesario para que FlatList calcule bien el ancho con numColumns
        key={width} // re-render si cambia orientación
      />
    </SafeAreaView>
  );
}

function StatItem({ value, label }: { value: number | string; label: string }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  screenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dbdbdb',
  },
  screenTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: '#000',
  },
  menuIcon: {
    fontSize: 22,
    color: '#000',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 16,
    gap: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#dbdbdb',
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontWeight: '700',
    fontSize: 16,
    color: '#000',
  },
  statLabel: {
    fontSize: 12,
    color: '#000',
    marginTop: 2,
  },
  name: {
    fontWeight: '700',
    fontSize: 13,
    color: '#000',
    paddingHorizontal: 14,
    marginBottom: 4,
  },
  bio: {
    fontSize: 13,
    color: '#000',
    paddingHorizontal: 14,
    lineHeight: 18,
    marginBottom: 12,
  },
  editButton: {
    marginHorizontal: 14,
    marginBottom: 12,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dbdbdb',
    alignItems: 'center',
  },
  editButtonText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#000',
  },
  tabsRow: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#dbdbdb',
    marginTop: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  tabItemActive: {
    borderBottomColor: '#000',
  },
  tabIcon: {
    fontSize: 20,
    color: '#000',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#dbdbdb',
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
});
