import type {
  FilmDescription,
  Films,
  Genre,
  QueryParams,
} from "shared/api/films/model"
import { httpClient } from "shared/api/http-client"

const SLUG = {
  films: "src/shared/api/films1.json",
  description: "src/shared/api/film-description.json",
  genres: "src/shared/api/genres.json",
}

// export const getFilms = (queryParams: QueryParams) =>
// httpClient.get<Films>(SLUG.films, { params: queryParams }).then((data) => data)

export const getGenres = () =>
  httpClient.get<Genre[]>(SLUG.genres).then((data) => data)

export const getFilteredFilms = (params: QueryParams) =>
  httpClient.get<Films>(SLUG.films).then((data) => {
    console.log("filtered-params", params, "data", data)

    return data
  })

export const getFilmDescriptionById = (id: string) =>
  httpClient.get<FilmDescription>(SLUG.description).then((data) => {
    console.log("description", data, id)
    return data
  })
