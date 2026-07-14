export interface CatApiResponse {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface Post {
  id: string;
  imageUrl: string;
  username: string;
  location: string;
  likes: number;
  caption: string;
  avatar: string;
}
