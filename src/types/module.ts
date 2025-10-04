// types/module.ts

export interface ClassItem {
  id: number;
  documentId?: string;
  title?: string;
  videoUrl?: string;
  duration?: number;
  recordAvailable?: boolean;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface CourseRef {
  id: number;
  documentId?: string;
  title?: string;
  slug?: string;
  level?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface ModuleItem {
  id: number;
  documentId?: string;
  title?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  course?: CourseRef;
  classes?: ClassItem[];
}
