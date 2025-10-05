export type TextNode = { type: "text"; text: string };
export type ContentBlock = { type: string; children: TextNode[] };


export type UploadResult = Record<string, unknown> & {
  id?: number;
  url?: string;
};