// Componente de la barra de historias que aparece debajo del header en el feed.
// Muestra una lista horizontal de avatares con nombre de usuario.
// Al tocar una historia, el anillo de color pasa a gris (marcada como vista).

import { useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';

// Definimos la forma de cada historia
interface Historia {
  id: string;
  username: string;
  avatar: string;
  vista: boolean; // true si el usuario ya la vio
}

// Lista fija de historias simuladas
const HISTORIAS: Historia[] = [
  { id: '0', username: 'Tu historia', avatar: 'https://i.pravatar.cc/150?img=12', vista: true },
  { id: '1', username: 'gatito_fan',  avatar: 'https://i.pravatar.cc/150?img=1',  vista: false },
  { id: '2', username: 'michi_lover', avatar: 'https://i.pravatar.cc/150?img=2',  vista: false },
  { id: '3', username: 'cat.world',   avatar: 'https://i.pravatar.cc/150?img=3',  vista: false },
  { id: '4', username: 'fluffy_paws', avatar: 'https://i.pravatar.cc/150?img=4',  vista: false },
  { id: '5', username: 'meow.daily',  avatar: 'https://i.pravatar.cc/150?img=5',  vista: false },
  { id: '6', username: 'cats_of_ig',  avatar: 'https://i.pravatar.cc/150?img=6',  vista: false },
  { id: '7', username: 'whiskers99',  avatar: 'https://i.pravatar.cc/150?img=7',  vista: false },
  { id: '8', username: 'purr.machine',avatar: 'https://i.pravatar.cc/150?img=8',  vista: false },
  { id: '9', username: 'neko_fan',    avatar: 'https://i.pravatar.cc/150?img=9',  vista: false },
];

export function StoriesBar() {
  // Guardamos las historias en estado para poder actualizar cuáles fueron vistas
  const [historias, setHistorias] = useState<Historia[]>(HISTORIAS);

  // Cuando el usuario toca una historia, la marcamos como vista
  function marcarComoVista(id: string) {
    setHistorias((anterior) =>
      anterior.map((h) => (h.id === id ? { ...h, vista: true } : h))
    );
  }

  return (
    <View style={estilos.contenedor}>
      <FlatList
        data={historias}
        keyExtractor={(item) => item.id}
        horizontal                          // lista horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={estilos.lista}
        renderItem={({ item }) => (
          <ItemHistoria historia={item} alPresionar={() => marcarComoVista(item.id)} />
        )}
      />
    </View>
  );
}

// Componente que representa una historia individual en la barra
function ItemHistoria({ historia, alPresionar }: { historia: Historia; alPresionar: () => void }) {
  const esMia = historia.id === '0'; // "Tu historia" es la primera

  return (
    <Pressable style={estilos.item} onPress={alPresionar}>

      {/* Anillo de color: rosa si no fue vista, gris si ya fue vista */}
      <View style={[estilos.anillo, historia.vista && estilos.anilloVisto]}>
        {/* Borde blanco interno para separar el anillo del avatar */}
        <View style={estilos.anilloInterior}>
          <Image source={{ uri: historia.avatar }} style={estilos.avatar} />
        </View>
      </View>

      {/* Botón "+" que aparece solo en "Tu historia" */}
      {esMia && (
        <View style={estilos.botonAgregar}>
          <Text style={estilos.iconoAgregar}>+</Text>
        </View>
      )}

      <Text style={estilos.username} numberOfLines={1}>
        {historia.username}
      </Text>

    </Pressable>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dbdbdb',
    paddingVertical: 8,
  },
  lista: {
    paddingHorizontal: 10,
    gap: 12,
  },
  item: {
    alignItems: 'center',
    width: 68,
  },
  anillo: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 2,
    borderColor: '#c13584', // rosa/morado de Instagram
    padding: 2,
    marginBottom: 4,
  },
  anilloVisto: {
    borderColor: '#dbdbdb', // gris cuando ya fue vista
  },
  anilloInterior: {
    flex: 1,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  botonAgregar: {
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
  iconoAgregar: {
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
