// Este archivo se encarga de comunicarse con The Cat API.
// Trae las imágenes de gatos y les agrega datos simulados
// para armar los posts del feed (usuario, ubicación, likes, etc.)

import axios from 'axios';
import { CatApiResponse, Post } from '@/types/post';

// Lista de nombres de usuario simulados para los posts
const USERNAMES = [
  'gatito_feliz', 'michi_lover', 'cat.world', 'fluffy_paws',
  'meow.daily', 'cats_of_ig', 'whiskers99', 'purr.machine',
  'neko_fan', 'gatetes_ok', 'tabby_vibes', 'mittens_ig',
];

// Lista de ubicaciones simuladas
const LOCATIONS = [
  'Buenos Aires, Argentina', 'Madrid, España', 'Ciudad de México',
  'Montevideo, Uruguay', 'Santiago, Chile', 'Lima, Perú',
  'Bogotá, Colombia', 'Lisboa, Portugal', 'Roma, Italia', 'Tokio, Japón',
];

// Lista de descripciones simuladas para cada post
const CAPTIONS = [
  'Lunes de siesta 😴',
  'El sol me llama... y yo le hago caso 🌞',
  'Modo zen activado 🧘',
  'Cuando el lunes se siente como el viernes 🐾',
  '¿Quién necesita amigos cuando tenés una cama? 🛏️',
  'Vigilando el vecindario desde mi trono 👑',
  'No me molestes, estoy ocupado siendo adorable 🐱',
  'El mundo puede esperar. Yo no. 😤',
  'Buscando rayos de sol desde las 6am ☀️',
  'Experto en el arte del descanso 🎭',
  'La vida es mejor desde aquí arriba 🌿',
  'Reunión cancelada. Siesta en agenda. ✅',
];

// Función principal que trae los posts desde la API.
// Es async porque la llamada HTTP tarda un tiempo, y hay que esperar la respuesta.
export async function getCatPosts(): Promise<Post[]> {
  // Pedimos 12 imágenes a The Cat API con Axios
  const respuesta = await axios.get<CatApiResponse[]>(
    'https://api.thecatapi.com/v1/images/search?limit=12'
  );

  // Convertimos cada imagen recibida en un objeto Post
  // usando el índice para elegir username, ubicación y caption de las listas de arriba
  return respuesta.data.map((gato, indice) => ({
    id: gato.id,
    imageUrl: gato.url,
    username: USERNAMES[indice % USERNAMES.length],
    location: LOCATIONS[indice % LOCATIONS.length],
    likes: Math.floor(Math.random() * 9000) + 100, // número de likes aleatorio entre 100 y 9100
    caption: CAPTIONS[indice % CAPTIONS.length],
    avatar: `https://i.pravatar.cc/150?img=${(indice % 12) + 1}`, // avatar simulado
  }));
}
