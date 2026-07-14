import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function HomeHeader() {
  return (
    <View style={styles.container}>
      {/* Logo: ícono + texto */}
      <View style={styles.logoRow}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logoIcon}
          resizeMode="contain"
        />
        {/* Texto con degradado simulado letra por letra */}
        <Text style={styles.logoText}>
          <Text style={{ color: '#f58529' }}>C</Text>
          <Text style={{ color: '#e6683c' }}>a</Text>
          <Text style={{ color: '#dc2743' }}>t</Text>
          <Text style={{ color: '#cc2366' }}>s</Text>
          <Text style={{ color: '#bc1888' }}>t</Text>
          <Text style={{ color: '#a8178a' }}>a</Text>
          <Text style={{ color: '#932d8c' }}>g</Text>
          <Text style={{ color: '#7e3a8e' }}>r</Text>
          <Text style={{ color: '#6a4698' }}>a</Text>
          <Text style={{ color: '#5851a2' }}>m</Text>
        </Text>
      </View>

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
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dbdbdb',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0,
  },
  logoIcon: {
    width: 42,
    height: 42,
    marginLeft: -4,
    transform: [{ scale: 1.6 }],
  },
  logoText: {
    fontSize: 23,
    fontWeight: '400',
    fontStyle: 'italic',
    letterSpacing: 0.5,
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
