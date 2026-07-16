// Este es el layout raíz de la app. Es el primer componente que se monta.
// Acá se configuran dos cosas globales:
//   1. La SplashScreen (pantalla de carga que se ve al abrir la app)
//   2. El Stack Navigator, que define las pantallas principales y cómo se navega entre ellas

import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

// Evita que la SplashScreen se oculte sola antes de que estemos listos
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Ocultamos la SplashScreen luego de 500ms para asegurarnos
    // de que el layout ya terminó de montarse antes de mostrar la app
    const timer = setTimeout(() => {
      SplashScreen.hideAsync();
    }, 500);

    // Limpiamos el timer si el componente se desmonta antes de que termine
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* StatusBar oscura para que contraste bien con el header blanco */}
      <StatusBar style="dark" backgroundColor="#fff" />

      {/* Stack define las pantallas de la app y cómo se apilan al navegar */}
      <Stack>
        {/* Las tabs (Home + Perfil) no muestran header propio */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Pantalla de detalle de un post, con header blanco y título */}
        <Stack.Screen
          name="post/[id]"
          options={{
            title: 'Publicación',
            headerStyle: { backgroundColor: '#fff' },
            headerShadowVisible: true,
            headerTintColor: '#000',
          }}
        />
      </Stack>
    </>
  );
}
