// Este archivo define la barra de navegación inferior (las tabs).
// Cada <Tabs.Screen> representa un botón en esa barra.
// La carpeta (tabs) agrupa las pantallas que comparten esta barra.

import { Tabs } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,          // cada pantalla maneja su propio header
        tabBarShowLabel: false,      // no mostramos texto debajo de los íconos
        tabBarStyle: estilos.tabBar,
        tabBarActiveTintColor: '#000',   // color cuando la tab está seleccionada
        tabBarInactiveTintColor: '#888', // color cuando no está seleccionada
      }}
    >
      {/* Tab 1: Pantalla principal (Feed) */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <IconoTab source={require('@/assets/images/tabIcons/home.png')} activo={focused} />
          ),
        }}
      />

      {/* Tab 2: Pantalla de Perfil */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            // En vez de un ícono de imagen, mostramos el avatar del usuario
            <View style={[estilos.avatarTab, focused && estilos.avatarTabActivo]}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
                style={estilos.avatarIcono}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

// Componente auxiliar para los íconos de las tabs.
// Recibe la imagen y si está activa o no, y ajusta la opacidad.
function IconoTab({ source, activo }: { source: number; activo: boolean }) {
  return (
    <Image
      source={source}
      style={[estilos.icono, { opacity: activo ? 1 : 0.5 }]}
      resizeMode="contain"
    />
  );
}

const estilos = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth, // línea finísima arriba de la barra
    borderTopColor: '#dbdbdb',
    height: 50,
    paddingBottom: 0,
  },
  icono: {
    width: 24,
    height: 24,
  },
  // Contenedor del avatar en la tab de perfil
  avatarTab: {
    width: 28,
    height: 28,
    borderRadius: 14,
    overflow: 'hidden',
  },
  // Cuando la tab de perfil está activa, le ponemos un borde negro
  avatarTabActivo: {
    borderWidth: 2,
    borderColor: '#000',
  },
  avatarIcono: {
    width: '100%',
    height: '100%',
  },
});
