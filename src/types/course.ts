// types/course.ts
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

export interface Module {
  id: number;
  documentId: string;
  title: string;
  description?: string;
  createdAt?: string;
}

export interface CourseItem {
  id: number;
  documentId: string;
  title?: string;
  slug?: string;
  level?: string;
  createdAt?: string;
  updatedAt?: string;
  shortDescription?: { type: string; children: { type: string; text: string }[] }[];
  coverImage?: Media;
  modules?: Module[];
}
