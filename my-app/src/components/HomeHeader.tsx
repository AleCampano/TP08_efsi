// Componente del encabezado superior del feed.
// Muestra el logo "Catstagram" a la izquierda y dos íconos a la derecha.
// No recibe props porque siempre muestra lo mismo.

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function HomeHeader() {
  return (
    <View style={estilos.contenedor}>

      {/* Logo: ícono de gato + texto "Catstagram" con colores degradados */}
      <View style={estilos.filaLogo}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={estilos.iconoLogo}
          resizeMode="contain"
        />
        {/* Cada letra tiene un color distinto para simular el degradado de Instagram */}
        <Text style={estilos.textoLogo}>
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

      {/* Íconos de la derecha: notificaciones y mensajes */}
      <View style={estilos.iconos}>
        <TouchableOpacity hitSlop={8}>
          <Text style={estilos.icono}>♡</Text>
        </TouchableOpacity>
        <TouchableOpacity hitSlop={8}>
          <Text style={estilos.icono}>✉</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dbdbdb',
  },
  filaLogo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconoLogo: {
    width: 42,
    height: 42,
    marginLeft: -4,
    transform: [{ scale: 1.6 }],
  },
  textoLogo: {
    fontSize: 23,
    fontWeight: '400',
    fontStyle: 'italic',
    letterSpacing: 0.5,
  },
  iconos: {
    flexDirection: 'row',
    gap: 18,
  },
  icono: {
    fontSize: 24,
    color: '#000',
  },
});
