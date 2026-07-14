import { Tabs } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#888',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon source={require('@/assets/images/tabIcons/home.png')} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.avatarTab, focused && styles.avatarTabFocused]}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
                style={styles.avatarIcon}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

function TabIcon({ source, focused }: { source: number; focused: boolean }) {
  return (
    <Image
      source={source}
      style={[styles.icon, { opacity: focused ? 1 : 0.5 }]}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#dbdbdb',
    height: 50,
    paddingBottom: 0,
  },
  icon: {
    width: 24,
    height: 24,
  },
  avatarTab: {
    width: 28,
    height: 28,
    borderRadius: 14,
    overflow: 'hidden',
  },
  avatarTabFocused: {
    borderWidth: 2,
    borderColor: '#000',
  },
  avatarIcon: {
    width: '100%',
    height: '100%',
  },
});
