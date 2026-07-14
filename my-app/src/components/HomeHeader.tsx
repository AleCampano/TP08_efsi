import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function HomeHeader() {
  return (
    <View style={styles.container}>
      {/* Logo Instagram */}
      <Text style={styles.logo}>Instagram</Text>

      {/* Íconos derecha */}
      <View style={styles.icons}>
        <TouchableOpacity hitSlop={8}>
          <Text style={styles.icon}>♡</Text>
        </TouchableOpacity>
        <TouchableOpacity hitSlop={8}>
          <Text style={styles.icon}>✉</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dbdbdb',
  },
  logo: {
    fontFamily: 'serif',
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    letterSpacing: -0.5,
  },
  icons: {
    flexDirection: 'row',
    gap: 18,
  },
  icon: {
    fontSize: 24,
    color: '#000',
  },
});
