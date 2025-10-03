// types/post.ts
export interface MediaFormats {
  thumbnail?: { url: string };
  small?: { url: string };
  medium?: { url: string };
  large?: { url: string };
}

export interface Media {
  id: number;
  name: string;
  url: string;
  formats: MediaFormats;
}

export interface PostContentChild {
  type: string;
  children: { type: string; text: string }[];
}

export interface PostContent {
  type: string;
  children: { type: string; text: string }[];
}

export interface PostItem {
  id: number;
  documentId: string;
  title: string;
  content: PostContent[];
  createdAt: string;
  media?: Media;
}
