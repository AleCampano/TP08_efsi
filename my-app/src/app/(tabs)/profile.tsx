// Pantalla de Perfil del usuario.
// Muestra la información del perfil (avatar, nombre, bio, estadísticas)
// y una grilla de 3 columnas con todas las fotos, usando FlatList con numColumns=3.
// Al tocar una foto navega al detalle del post.

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

// Cuántas columnas tiene la grilla de fotos
const COLUMNAS = 3;
// Espacio en píxeles entre cada foto de la grilla
const ESPACIO = 1;

// Datos fijos del perfil simulado
const PERFIL = {
  username: 'gatito_feliz',
  nombre: 'Michi Gatuno 🐱',
  bio: 'Fan de los gatos 🐾 | Fotógrafo felino | Buenos Aires, ARG',
  avatar: 'https://i.pravatar.cc/150?img=12',
  publicaciones: 24,
  seguidores: 1842,
  seguidos: 312,
};

export default function PantallaPerfil() {
  const router = useRouter();

  // useWindowDimensions nos da el ancho real de la pantalla,
  // lo usamos para calcular el tamaño exacto de cada foto en la grilla
  const { width } = useWindowDimensions();
  const tamanoItem = (width - ESPACIO * (COLUMNAS - 1)) / COLUMNAS;

  // Posts que se muestran en la grilla
  const [postsPerfil, setPostsPerfil] = useState<Post[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    getCatPosts()
      .then((data) => setPostsPerfil(data))
      .finally(() => setCargando(false));
  }, []);

  // Navega al detalle del post con todos sus datos
  function irAlDetalle(post: Post) {
    router.push({
      pathname: '/post/[id]',
      params: {
        id: post.id,
        imageUrl: post.imageUrl,
        username: PERFIL.username,
        location: 'Buenos Aires, Argentina',
        likes: post.likes,
        caption: post.caption,
        avatar: PERFIL.avatar,
      },
    });
  }

  // Encabezado del perfil: avatar, estadísticas, nombre, bio y botón
  // Lo definimos acá para poder usarlo como ListHeaderComponent del FlatList
  function EncabezadoPerfil() {
    return (
      <View>
        {/* Fila superior: avatar + estadísticas */}
        <View style={estilos.seccionPerfil}>
          <Image source={{ uri: PERFIL.avatar }} style={estilos.avatar} />
          <View style={estilos.estadisticas}>
            <ItemEstadistica valor={PERFIL.publicaciones} etiqueta="Publicaciones" />
            <ItemEstadistica valor={PERFIL.seguidores.toLocaleString()} etiqueta="Seguidores" />
            <ItemEstadistica valor={PERFIL.seguidos} etiqueta="Seguidos" />
          </View>
        </View>

        {/* Nombre y biografía */}
        <Text style={estilos.nombre}>{PERFIL.nombre}</Text>
        <Text style={estilos.bio}>{PERFIL.bio}</Text>

        {/* Botón decorativo de editar perfil */}
        <TouchableOpacity style={estilos.botonEditar}>
          <Text style={estilos.textoBotonEditar}>Editar perfil</Text>
        </TouchableOpacity>

        {/* Tabs decorativas de grilla / reels / etiquetados */}
        <View style={estilos.filaTabs}>
          <View style={[estilos.tabItem, estilos.tabActiva]}>
            <Text style={estilos.iconoTab}>⊞</Text>
          </View>
          <View style={estilos.tabItem}>
            <Text style={estilos.iconoTab}>▷</Text>
          </View>
          <View style={estilos.tabItem}>
            <Text style={estilos.iconoTab}>◻</Text>
          </View>
        </View>

        <View style={estilos.divisor} />
      </View>
    );
  }

  // Mientras carga la API, mostramos un spinner
  if (cargando) {
    return (
      <SafeAreaView style={estilos.centrado} edges={['top']}>
        <ActivityIndicator size="large" color="#c13584" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={estilos.contenedor} edges={['top']}>

      {/* Header con nombre de usuario y menú */}
      <View style={estilos.headerPantalla}>
        <Text style={estilos.tituloPantalla}>{PERFIL.username}</Text>
        <TouchableOpacity hitSlop={8}>
          <Text style={estilos.iconoMenu}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* FlatList con numColumns=3 para mostrar la grilla de fotos */}
      {/* key={width} hace que se re-renderice si el dispositivo rota */}
      <FlatList
        data={postsPerfil}
        keyExtractor={(item) => item.id}
        numColumns={COLUMNAS}
        ListHeaderComponent={<EncabezadoPerfil />}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => irAlDetalle(item)}
            style={[
              { width: tamanoItem, height: tamanoItem },
              // Agrega espacio a la derecha de las dos primeras fotos de cada fila
              (index % COLUMNAS) < COLUMNAS - 1 && { marginRight: ESPACIO },
            ]}
          >
            <Image
              source={{ uri: item.imageUrl }}
              style={estilos.imagenGrilla}
              resizeMode="cover"
            />
          </Pressable>
        )}
        // Espacio vertical entre filas
        ItemSeparatorComponent={() => <View style={{ height: ESPACIO }} />}
        showsVerticalScrollIndicator={false}
        key={width}
      />

    </SafeAreaView>
  );
}

// Componente auxiliar para cada estadística del perfil (publicaciones, seguidores, seguidos)
function ItemEstadistica({ valor, etiqueta }: { valor: number | string; etiqueta: string }) {
  return (
    <View style={estilos.itemEstadistica}>
      <Text style={estilos.valorEstadistica}>{valor}</Text>
      <Text style={estilos.etiquetaEstadistica}>{etiqueta}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centrado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerPantalla: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dbdbdb',
  },
  tituloPantalla: {
    fontWeight: '700',
    fontSize: 16,
    color: '#000',
  },
  iconoMenu: {
    fontSize: 22,
    color: '#000',
  },
  seccionPerfil: {
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
  estadisticas: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  itemEstadistica: {
    alignItems: 'center',
  },
  valorEstadistica: {
    fontWeight: '700',
    fontSize: 16,
    color: '#000',
  },
  etiquetaEstadistica: {
    fontSize: 12,
    color: '#000',
    marginTop: 2,
  },
  nombre: {
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
  botonEditar: {
    marginHorizontal: 14,
    marginBottom: 12,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dbdbdb',
    alignItems: 'center',
  },
  textoBotonEditar: {
    fontWeight: '600',
    fontSize: 14,
    color: '#000',
  },
  filaTabs: {
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
  tabActiva: {
    borderBottomColor: '#000',
  },
  iconoTab: {
    fontSize: 20,
    color: '#000',
  },
  divisor: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#dbdbdb',
  },
  imagenGrilla: {
    width: '100%',
    height: '100%',
  },
});
