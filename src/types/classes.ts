// types/classes.ts
export interface Module {
  id: number;
  documentId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ClassItem {
  id: number;
  documentId: string;
  title: string;
  videoUrl: string;
  duration: number;
  recordAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  resources: any;
  module: Module;
}

export interface ClassesResponse {
  data: ClassItem[];
}
