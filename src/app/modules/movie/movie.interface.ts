export type TReview = {
  email: string;
  rating: number;
  comment: string;
};

export type TMovies = {
  title: string;
  description: string;
  releaseDate: string;
  genre: string;
  isDeleted: boolean;
  viewCount: number;
  reviews: TReview[];
};
