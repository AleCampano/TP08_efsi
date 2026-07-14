import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

// Mantiene la splash visible hasta que la llamemos a ocultar
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // La ocultamos después de un pequeño delay para asegurar que
    // el layout ya se montó correctamente
    const timer = setTimeout(() => {
      SplashScreen.hideAsync();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* StatusBar oscura para contrastar con el header blanco de Instagram */}
      <StatusBar style="dark" backgroundColor="#fff" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="post/[id]"
          options={{
            title: 'Publicación',
            headerBackTitle: '',
            headerStyle: { backgroundColor: '#fff' },
            headerShadowVisible: true,
            headerTintColor: '#000',
          }}
        />
      </Stack>
    </>
  );
}
