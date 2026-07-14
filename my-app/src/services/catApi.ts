import axios from 'axios';

import { CatApiResponse, Post } from '@/types/post';

// Datos simulados para usuarios y captions
const USERNAMES = [
  'gatito_feliz', 'michi_lover', 'cat.world', 'fluffy_paws',
  'meow.daily', 'cats_of_ig', 'whiskers99', 'purr.machine',
  'neko_fan', 'gatetes_ok', 'tabby_vibes', 'mittens_ig',
];

const LOCATIONS = [
  'Buenos Aires, Argentina', 'Madrid, España', 'Ciudad de México',
  'Montevideo, Uruguay', 'Santiago, Chile', 'Lima, Perú',
  'Bogotá, Colombia', 'Lisboa, Portugal', 'Roma, Italia', 'Tokio, Japón',
];

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

// Avatares simulados
const AVATAR_BASE = 'https://i.pravatar.cc/150?img=';

export async function getCatPosts(): Promise<Post[]> {
  const response = await axios.get<CatApiResponse[]>(
    'https://api.thecatapi.com/v1/images/search?limit=12'
  );

  return response.data.map((cat, index) => ({
    id: cat.id,
    imageUrl: cat.url,
    username: USERNAMES[index % USERNAMES.length],
    location: LOCATIONS[index % LOCATIONS.length],
    likes: Math.floor(Math.random() * 9000) + 100,
    caption: CAPTIONS[index % CAPTIONS.length],
    avatar: `${AVATAR_BASE}${(index % 12) + 1}`,
  }));
}
