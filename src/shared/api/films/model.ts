export type Genre = {
  name: string
  slug: string
}

export type Country = {
  name: string
}

export type ReleaseYear = {
  start: number
  end: number
}

export type Rating = {
  kp: number
  imdb: number
  filmCritics: number
  russianFilmCritics: number
  await: number
}

export type Votes = {
  kp: number
  imdb: number
  filmCritics: number
  russianFilmCritics: number
  await: number
}

export type Posters = {
  url: string
  previewUrl: string
}

export type Film = {
  id: number
  name: null
  alternativeName: string
  type: string
  typeNumber: number
  year: 2001
  description: null
  shortDescription: null
  status: string
  rating: Rating
  votes: Votes
  movieLength: null
  totalSeriesLength: number
  seriesLength: null
  ratingMpaa: null
  ageRating: null
  genres: Genre[]
  countries: Country[]
  releaseYears: ReleaseYear[]
  top10: null
  top250: null
  isSeries: true
  ticketsOnSale: false
  poster: Posters
}

export type Films = {
  total: number
  limit: number
  page: number
  pages: number
  docs: Film[]
}

export type QueryParams = {
  limit?: number
  page?: number
  type?: string[]
  year?: string
  "rating.imdb"?: string
  id?: string
}

export type FilmDescription = {
  id: number
  name?: string
  alternativeName: string | null
  enName: string | null
  type: string
  typeNumber: number
  year?: number
  description?: string
  shortDescription: string | null
  slogan: string | null
  status: string | null
  rating: {
    kp: number
    imdb: number
    filmCritics: number
    russianFilmCritics: number
    await: number
  }
  votes: {
    kp: number
    imdb: number
    filmCritics: number
    russianFilmCritics: number
    await: number
  }
  movieLength: number
  totalSeriesLength: number | null
  seriesLength: number | null
  ratingMpaa: string | null
  ageRating: number | null
  poster?: {
    url?: string
    previewUrl?: string
  }
  genres?: Array<{
    name: string
  }>
  countries: Array<{
    name: string
  }>
  persons: Array<{
    id: number
    photo: string
    name: string
    enName: string | null
    description: string | null
    profession: string
    enProfession: string
  }>
  budget: {
    currency: string
    value: number
  }
}
