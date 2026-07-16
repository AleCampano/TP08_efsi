// Este archivo define la forma que tienen los datos en la app.
// TypeScript usa estas "interfaces" para saber qué campos esperar
// en cada objeto, lo que ayuda a detectar errores antes de correr la app.

// Lo que nos devuelve The Cat API por cada imagen
export interface CatApiResponse {
  id: string;     // identificador único del gato
  url: string;    // dirección de la imagen
  width: number;  // ancho en píxeles
  height: number; // alto en píxeles
}

// Lo que usa la app internamente para mostrar cada post en el feed
export interface Post {
  id: string;       // identificador único del post (viene del id del gato)
  imageUrl: string; // URL de la imagen del gato
  username: string; // nombre de usuario simulado
  location: string; // ubicación simulada
  likes: number;    // cantidad de likes
  caption: string;  // descripción del post
  avatar: string;   // URL del avatar del usuario
}
