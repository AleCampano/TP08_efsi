# Instagram Felino 🐱

Clon móvil de Instagram desarrollado con **React Native** y **Expo**, como parte del TP08 de la materia EFSI. Consume imágenes en tiempo real desde [The Cat API](https://thecatapi.com) para simular un feed de publicaciones.

---

## Inicialización del entorno

```bash
npm install
npx expo start
```

Luego escaneá el QR con la app **Expo Go** (Android/iOS) o presioná `a` para Android, `i` para iOS.

---

## Referencia visual

El diseño fue basado en la interfaz oficial de Instagram para dispositivos móviles.  
Referencia Figma: [Instagram Mobile UI – Community](https://www.figma.com/community/file/1293510563974944244)

---

## Árbol de directorios

```
my-app/
├── app.json                        ← Configuración de Expo (nombre, íconos, splash)
├── assets/
│   └── images/
│       ├── icon.png                ← Ícono de la app
│       └── splash-icon.png        ← Imagen de la SplashScreen
└── src/
    ├── app/                        ← Rutas (expo-router, file-based)
    │   ├── _layout.tsx             ← Stack raíz + SplashScreen + StatusBar
    │   ├── (tabs)/
    │   │   ├── _layout.tsx         ← Tab bar inferior (Home + Perfil)
    │   │   ├── index.tsx           ← Pantalla Home (Feed)
    │   │   └── profile.tsx         ← Pantalla Perfil
    │   └── post/
    │       └── [id].tsx            ← Detalle de publicación (ruta dinámica)
    ├── components/
    │   ├── PostCard.tsx            ← Card individual del feed
    │   └── HomeHeader.tsx          ← Header superior con logo Instagram
    ├── services/
    │   └── catApi.ts               ← Servicio HTTP con Axios hacia The Cat API
    └── types/
        └── post.ts                 ← Interfaces TypeScript: Post, CatApiResponse
```

---

## Componentes atómicos y props

### `PostCard`
Recibe un objeto `post: Post` por props y renderiza una publicación completa del feed.

| Prop | Tipo   | Descripción                        |
|------|--------|------------------------------------|
| post | `Post` | Objeto con todos los datos del post |

Maneja estado local con `useState`:
- `liked: boolean` — si el usuario dio like
- `likeCount: number` — contador de likes actualizado en tiempo real

Al presionar la imagen navega a `/post/[id]` pasando todos los parámetros por `router.push`.

### `HomeHeader`
Componente presentacional sin props. Renderiza el logo "Instagram" en tipografía serif y los íconos de notificaciones y mensajes.

---

## Gestión de estados

| Estado       | Ubicación             | Hook       | Descripción                                  |
|--------------|-----------------------|------------|----------------------------------------------|
| `posts`      | `(tabs)/index.tsx`    | `useState` | Array de publicaciones cargadas desde la API |
| `loading`    | `(tabs)/index.tsx`    | `useState` | Controla el spinner de carga inicial         |
| `error`      | `(tabs)/index.tsx`    | `useState` | Mensaje de error si la API falla             |
| `liked`      | `PostCard.tsx`        | `useState` | Estado del botón de like por post            |
| `likeCount`  | `PostCard.tsx`        | `useState` | Contador de likes reactivo por post          |
| `liked`      | `post/[id].tsx`       | `useState` | Like en la vista de detalle                  |
| `likeCount`  | `post/[id].tsx`       | `useState` | Contador de likes en el detalle              |
| `gridPosts`  | `(tabs)/profile.tsx`  | `useState` | Posts para el grid del perfil                |

La carga de la API se dispara una sola vez con `useEffect(fn, [])` al montar cada pantalla.

---

## Flujo de navegación

```
(tabs)/index.tsx  ──presionar post──►  post/[id].tsx
       │
       └── tab bar ──►  (tabs)/profile.tsx  ──presionar imagen──►  post/[id].tsx
```

La navegación usa **expo-router** con un Stack raíz que contiene las tabs y la ruta dinámica de detalle.

---

## Checklist de requisitos

- [x] Barra de navegación nativa superior
- [x] Feed con `FlatList` (prohibido `.map()`)
- [x] Mínimo 10 registros desde API con Axios
- [x] Estilos exclusivamente con `StyleSheet.create()`
- [x] Interacciones con `TouchableOpacity` y `Pressable`
- [x] Navegación Feed → Detalle → Perfil
- [x] Grid de 3 columnas con `numColumns={3}`
- [x] SplashScreen, ícono y StatusBar personalizados
