export interface Movie {
  id: number
  title: string
  plot: string
  releaseYear: number
  genres: string[]
  tmdbRating: number
  runtime: number
  posterUrl: string
  backdropUrl: string
  trailerUrl: string
  trailerYouTubeId: string
  language: string
  budget?: string
  revenue?: string
  director?: string
  production?: string
  awardsSummary?: string
}
