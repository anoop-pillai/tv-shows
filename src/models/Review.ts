export interface Review {
  id: string;
  showId: number;
  rating: number; // 1 to 10
  comment: string;
  createdAt: Date;
}
