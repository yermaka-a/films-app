import type {
  FilmDescription,
  Films,
  Genre,
  QueryParams,
} from "shared/api/films/model"
import { httpClient } from "shared/api/http-client"

const SLUG = {
  films: "/v1.4/movie",
  genres: "/v1/movie/possible-values-by-field?field=genres.name",
}

// export const getFilms = (queryParams: QueryParams) =>
// httpClient.get<Films>(SLUG.films, { params: queryParams }).then((data) => data)

export const getGenres = () =>
  httpClient.get<Genre[]>(SLUG.genres).then((data) => data)

export const getFilteredFilms = (params: QueryParams) =>
  httpClient.get<Films>(SLUG.films, { params }).then((data) => data)

export const getFilmDescriptionById = (id: string) =>
  httpClient.get<FilmDescription>(SLUG.films + `/${id}`).then((data) => data)
