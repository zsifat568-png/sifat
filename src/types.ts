export interface MediaItem {
  type: 'video' | 'image';
  url: string;
  thumbnail?: string;
  quality?: string;
}

export interface InstagramMediaData {
  title: string;
  username: string;
  userPic?: string;
  media: MediaItem[];
  originalUrl: string;
}

export interface HistoryItem {
  id: string;
  originalUrl: string;
  timestamp: number;
  data: InstagramMediaData;
}

export type ContentCategory = 'all' | 'video' | 'reel' | 'photo' | 'story' | 'igtv';
