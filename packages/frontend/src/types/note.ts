export interface NoteType {
  noteId?: string;
  content: string;
  createdAt?: string;
  attachment?: string;
  attachmentURL?: string;
}

export interface TideType {
  latitude: number;
  longitude:number;
  tag?: string;
  data?: string;
}
