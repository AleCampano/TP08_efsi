import { useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface Story {
  id: string;
  username: string;
  avatar: string;
  seen: boolean;
}

const STORIES: Story[] = [
  { id: '0', username: 'Tu historia', avatar: 'https://i.pravatar.cc/150?img=12', seen: true },
  { id: '1', username: 'gatito_fan', avatar: 'https://i.pravatar.cc/150?img=1', seen: false },
  { id: '2', username: 'michi_lover', avatar: 'https://i.pravatar.cc/150?img=2', seen: false },
  { id: '3', username: 'cat.world', avatar: 'https://i.pravatar.cc/150?img=3', seen: false },
  { id: '4', username: 'fluffy_paws', avatar: 'https://i.pravatar.cc/150?img=4', seen: false },
  { id: '5', username: 'meow.daily', avatar: 'https://i.pravatar.cc/150?img=5', seen: false },
  { id: '6', username: 'cats_of_ig', avatar: 'https://i.pravatar.cc/150?img=6', seen: false },
  { id: '7', username: 'whiskers99', avatar: 'https://i.pravatar.cc/150?img=7', seen: false },
  { id: '8', username: 'purr.machine', avatar: 'https://i.pravatar.cc/150?img=8', seen: false },
  { id: '9', username: 'neko_fan', avatar: 'https://i.pravatar.cc/150?img=9', seen: false },
];

export function StoriesBar() {
  const [stories, setStories] = useState<Story[]>(STORIES);

  function handlePress(id: string) {
    setStories((prev) =>
      prev.map((s) => (s.id === id ? { ...s, seen: true } : s))
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={stories}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <StoryItem story={item} onPress={() => handlePress(item.id)} />
        )}
      />
    </View>
  );
}

function StoryItem({ story, onPress }: { story: Story; onPress: () => void }) {
  const isMe = story.id === '0';

  return (
    <Pressable style={styles.item} onPress={onPress}>
      {/* Anillo degradado o gris si ya se vio */}
      <View style={[styles.ring, story.seen && styles.ringSeen]}>
        <View style={styles.ringInner}>
          <Image source={{ uri: story.avatar }} style={styles.avatar} />
        </View>
      </View>

      {/* Botón "+" para "Tu historia" */}
      {isMe && (
        <View style={styles.addButton}>
          <Text style={styles.addIcon}>+</Text>
        </View>
      )}

      <Text style={styles.username} numberOfLines={1}>
        {story.username}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dbdbdb',
    paddingVertical: 8,
  },
  list: {
    paddingHorizontal: 10,
    gap: 12,
  },
  item: {
    alignItems: 'center',
    width: 68,
  },
  ring: {
    width: 66,
    height: 66,
    borderRadius: 33,
    // Degradado simulado con borde de color
    borderWidth: 2,
    borderColor: '#c13584',
    padding: 2,
    marginBottom: 4,
  },
  ringSeen: {
    borderColor: '#dbdbdb',
  },
  ringInner: {
    flex: 1,
    borderRadius: 30,
    overflow: 'hidden',
    // Borde blanco interno para separar el anillo de la foto
    borderWidth: 2,
    borderColor: '#fff',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#0095f6',
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  username: {
    fontSize: 11,
    color: '#000',
    textAlign: 'center',
    width: '100%',
  },
});
