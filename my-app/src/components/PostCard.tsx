// Componente que representa una publicación individual en el feed.
// Recibe un objeto "post" por props y muestra toda la información:
// avatar, nombre, ubicación, imagen, botones de acción, likes y descripción.

import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Post } from '@/types/post';

// Props que recibe este componente: solo necesita el objeto post completo
interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const router = useRouter();

  // Estado local del like: cada post maneja su propio corazón y contador
  const [likeado, setLikeado] = useState(false);
  const [cantidadLikes, setCantidadLikes] = useState(post.likes);

  // Alterna el like: si estaba likeado lo saca, si no estaba lo pone
  function toggleLike() {
    setLikeado((anterior) => !anterior);
    setCantidadLikes((anterior) => (likeado ? anterior - 1 : anterior + 1));
  }

  // Navega a la pantalla de detalle del post, pasando todos los datos por parámetros
  function irAlDetalle() {
    router.push({
      pathname: '/post/[id]',
      params: {
        id: post.id,
        imageUrl: post.imageUrl,
        username: post.username,
        location: post.location,
        likes: cantidadLikes,
        caption: post.caption,
        avatar: post.avatar,
      },
    });
  }

  return (
    <View style={estilos.contenedor}>

      {/* Encabezado: avatar, nombre de usuario y ubicación */}
      <View style={estilos.header}>
        <Image source={{ uri: post.avatar }} style={estilos.avatar} />
        <View style={estilos.textoHeader}>
          <Text style={estilos.username}>{post.username}</Text>
          <Text style={estilos.ubicacion}>{post.location}</Text>
        </View>
        {/* Tres puntos (decorativo, sin acción) */}
        <TouchableOpacity hitSlop={8}>
          <Text style={estilos.iconoMas}>•••</Text>
        </TouchableOpacity>
      </View>

      {/* Imagen del post: al tocar va al detalle, al mantener presionado da like */}
      <Pressable onPress={irAlDetalle} onLongPress={toggleLike}>
        <Image
          source={{ uri: post.imageUrl }}
          style={estilos.imagenPost}
          resizeMode="cover"
        />
      </Pressable>

      {/* Barra de acciones: like, comentar, compartir y guardar */}
      <View style={estilos.acciones}>
        <View style={estilos.accionesIzquierda}>
          <TouchableOpacity onPress={toggleLike} style={estilos.botonAccion}>
            <Text style={estilos.iconoAccion}>{likeado ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={irAlDetalle} style={estilos.botonAccion}>
            <Text style={estilos.iconoAccion}>💬</Text>
          </TouchableOpacity>
          <TouchableOpacity style={estilos.botonAccion}>
            <Text style={estilos.iconoAccion}>✈️</Text>
          </TouchableOpacity>
        </View>
        {/* Ícono de guardar a la derecha */}
        <TouchableOpacity>
          <Text style={estilos.iconoAccion}>🔖</Text>
        </TouchableOpacity>
      </View>

      {/* Contador de likes */}
      <Text style={estilos.textLikes}>{cantidadLikes.toLocaleString()} Me gusta</Text>

      {/* Descripción del post, máximo 2 líneas */}
      <Text style={estilos.caption} numberOfLines={2}>
        <Text style={estilos.username}>{post.username} </Text>
        {post.caption}
      </Text>

    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    backgroundColor: '#fff',
    marginBottom: 8,
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
    marginTop: 1,
  },
  iconoMas: {
    fontSize: 14,
    color: '#000',
    letterSpacing: 1,
  },
  imagenPost: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#efefef',
  },
  acciones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 4,
  },
  accionesIzquierda: {
    flexDirection: 'row',
    gap: 12,
  },
  botonAccion: {
    padding: 2,
  },
  iconoAccion: {
    fontSize: 24,
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
    paddingBottom: 12,
    lineHeight: 18,
  },
});
