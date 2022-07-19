export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category?: string;
  inventory: number;
  notes?: string | null;
  prevId?: string | null;
}
