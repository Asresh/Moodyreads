export interface Mood {
  id: number;
  name: string;
  icon: string;
  description?: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  amazonLink?: string;
  genres?: string[];
  pages?: number;
  publishedYear?: number;
  language?: string;
  rating: number;
  ratingCount: number;
}

export interface MoodBook {
  id: number;
  moodId: number;
  bookId: number;
}
