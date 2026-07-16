// Pantalla de detalle de una publicación.
// Recibe los datos del post por parámetros de navegación (router.push desde PostCard o Perfil).
// Muestra la imagen en grande, el botón de like con contador en tiempo real y comentarios simulados.

import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Lista fija de comentarios simulados
const COMENTARIOS = [
  { id: '1', username: 'michi_lover',  texto: 'Qué lindo! 😍',              avatar: 'https://i.pravatar.cc/150?img=3'  },
  { id: '2', username: 'cat.world',    texto: 'Me encanta este gatito 🐱',  avatar: 'https://i.pravatar.cc/150?img=5'  },
  { id: '3', username: 'fluffy_paws',  texto: '❤️❤️❤️',                    avatar: 'https://i.pravatar.cc/150?img=7'  },
  { id: '4', username: 'meow.daily',   texto: 'Un angelito 🥹',             avatar: 'https://i.pravatar.cc/150?img=9'  },
  { id: '5', username: 'gatito_fan',   texto: 'Lo quiero adoptar ya!!',     avatar: 'https://i.pravatar.cc/150?img=11' },
];

export default function PantallaDetalle() {
  // useLocalSearchParams recupera los parámetros que se enviaron al navegar a esta pantalla
  const params = useLocalSearchParams<{
    id: string;
    imageUrl: string;
    username: string;
    location: string;
    likes: string;
    caption: string;
    avatar: string;
  }>();

  const navigation = useNavigation();

  // Estado del like: si está likeado y cuántos likes tiene
  const [likeado, setLikeado] = useState(false);
  const [cantidadLikes, setCantidadLikes] = useState(Number(params.likes ?? 0));

  // Cambia el título del header por el nombre de usuario del post
  useEffect(() => {
    navigation.setOptions({ title: params.username ?? 'Publicación' });
  }, [navigation, params.username]);

  // Alterna el like y actualiza el contador inmediatamente
  function toggleLike() {
    setLikeado((anterior) => !anterior);
    setCantidadLikes((anterior) => (likeado ? anterior - 1 : anterior + 1));
  }

  return (
    <ScrollView style={estilos.contenedor} showsVerticalScrollIndicator={false}>

      {/* Encabezado: avatar y nombre de usuario */}
      <View style={estilos.header}>
        <Image source={{ uri: params.avatar }} style={estilos.avatar} />
        <View style={estilos.textoHeader}>
          <Text style={estilos.username}>{params.username}</Text>
          <Text style={estilos.ubicacion}>{params.location}</Text>
        </View>
      </View>

      {/* Imagen del post en tamaño completo */}
      <Image
        source={{ uri: params.imageUrl }}
        style={estilos.imagen}
        resizeMode="cover"
      />

      {/* Barra de acciones: like, comentar, compartir y guardar */}
      <View style={estilos.acciones}>
        <View style={estilos.accionesIzquierda}>
          <TouchableOpacity onPress={toggleLike} style={estilos.botonAccion}>
            <Text style={estilos.iconoAccion}>{likeado ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={estilos.botonAccion}>
            <Text style={estilos.iconoAccion}>💬</Text>
          </TouchableOpacity>
          <TouchableOpacity style={estilos.botonAccion}>
            <Text style={estilos.iconoAccion}>✈️</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={estilos.iconoAccion}>🔖</Text>
        </TouchableOpacity>
      </View>

      {/* Contador de likes actualizado en tiempo real */}
      <Text style={estilos.textLikes}>{cantidadLikes.toLocaleString()} Me gusta</Text>

      {/* Descripción del post */}
      <Text style={estilos.caption}>
        <Text style={estilos.username}>{params.username} </Text>
        {params.caption}
      </Text>

      <View style={estilos.divisor} />

      {/* Sección de comentarios simulados */}
      <Text style={estilos.tituloComentarios}>Comentarios</Text>
      {COMENTARIOS.map((comentario) => (
        <View key={comentario.id} style={estilos.comentario}>
          <Image source={{ uri: comentario.avatar }} style={estilos.avatarComentario} />
          <Text style={estilos.textoComentario}>
            <Text style={estilos.username}>{comentario.username} </Text>
            {comentario.texto}
          </Text>
        </View>
      ))}

      {/* Espacio al final para que el último comentario no quede pegado al borde */}
      <View style={estilos.espacioFinal} />

    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
    borderWidth: 1.5,
    borderColor: '#c13584',
  },
  textoHeader: {
    flex: 1,
  },
  username: {
    fontWeight: '700',
    fontSize: 13,
    color: '#000',
  },
  ubicacion: {
    fontSize: 11,
    color: '#555',
  },
  imagen: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#efefef',
  },
  acciones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 4,
  },
  accionesIzquierda: {
    flexDirection: 'row',
    gap: 14,
  },
  botonAccion: {
    padding: 2,
  },
  iconoAccion: {
    fontSize: 26,
  },
  textLikes: {
    fontWeight: '700',
    fontSize: 13,
    color: '#000',
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  caption: {
    fontSize: 13,
    color: '#000',
    paddingHorizontal: 12,
    paddingBottom: 8,
    lineHeight: 18,
  },
  divisor: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#dbdbdb',
    marginVertical: 8,
    marginHorizontal: 12,
  },
  tituloComentarios: {
    fontWeight: '700',
    fontSize: 13,
    color: '#000',
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  comentario: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 12,
    marginBottom: 12,
    gap: 10,
  },
  avatarComentario: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  textoComentario: {
    flex: 1,
    fontSize: 13,
    color: '#000',
    lineHeight: 18,
  },
  espacioFinal: {
    height: 40,
  },
});
