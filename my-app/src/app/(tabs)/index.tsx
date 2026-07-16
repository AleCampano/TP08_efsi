// Pantalla principal: el Feed.
// Al montarse, llama a la API para traer los posts.
// Mientras carga muestra un spinner, si falla muestra un error,
// y cuando termina muestra la lista de posts con FlatList.

import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HomeHeader } from '@/components/HomeHeader';
import { PostCard } from '@/components/PostCard';
import { StoriesBar } from '@/components/StoriesBar';
import { getCatPosts } from '@/services/catApi';
import { Post } from '@/types/post';

export default function PantallaFeed() {
  // Lista de posts que se van a mostrar en el feed
  const [posts, setPosts] = useState<Post[]>([]);

  // true mientras esperamos la respuesta de la API
  const [cargando, setCargando] = useState(true);

  // Mensaje de error en caso de que la API falle
  const [error, setError] = useState<string | null>(null);

  // useEffect con array vacío [] significa que esto se ejecuta una sola vez,
  // cuando la pantalla se monta por primera vez
  useEffect(() => {
    getCatPosts()
      .then((data) => setPosts(data))           // si la API responde bien, guardamos los posts
      .catch(() => setError('No se pudieron cargar las publicaciones.')) // si falla, guardamos el error
      .finally(() => setCargando(false));        // en cualquier caso, dejamos de mostrar el spinner
  }, []);

  // Mientras carga, mostramos un spinner en el centro de la pantalla
  if (cargando) {
    return (
      <SafeAreaView style={estilos.centrado}>
        <ActivityIndicator size="large" color="#c13584" />
      </SafeAreaView>
    );
  }

  // Si hubo un error al cargar, mostramos el mensaje
  if (error) {
    return (
      <SafeAreaView style={estilos.centrado}>
        <Text style={estilos.textoError}>{error}</Text>
      </SafeAreaView>
    );
  }

  // Feed principal: header fijo arriba, luego stories y posts con FlatList
  // Usamos FlatList en lugar de .map() porque es más eficiente con listas largas:
  // solo renderiza los items que son visibles en pantalla en cada momento
  return (
    <SafeAreaView style={estilos.contenedor} edges={['top']}>
      {/* Header con el logo de Catstagram */}
      <HomeHeader />

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}

        // Las stories aparecen arriba de la lista como encabezado
        ListHeaderComponent={<StoriesBar />}

        showsVerticalScrollIndicator={false}

        // Separador visual entre posts
        ItemSeparatorComponent={() => <View style={estilos.separador} />}
      />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  centrado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  textoError: {
    color: '#e0245e',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  separador: {
    height: 2,
    backgroundColor: '#fafafa',
  },
});
