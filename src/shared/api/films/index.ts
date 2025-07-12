import type {
  FilmDescription,
  Films,
  Genre,
  QueryParams,
} from "shared/api/films/model"
import { httpClient } from "shared/api/http-client"

// const SLUG = {
//   films: "/films",
// }

export const getFilms = (queryParams: QueryParams) =>
  httpClient
    .get<Films>("./src/shared/api/films1.json", { params: queryParams })
    .then((data) => {
      console.log(data)
      return data
    })
//   httpClient.get<Films>(SLUG.films).then((data) => {
//     console.log(JSON.stringify(data))s
//     return data

//   })

export const getGenres = (): Genre[] => [
  {
    name: "аниме",
    slug: "anime",
  },
  {
    name: "биография",
    slug: "biografiya",
  },
  {
    name: "боевик",
    slug: "boevik",
  },
  {
    name: "вестерн",
    slug: "vestern",
  },
  {
    name: "военный",
    slug: "voennyy",
  },
  {
    name: "детектив",
    slug: "detektiv",
  },
  {
    name: "детский",
    slug: "detskiy",
  },
  {
    name: "для взрослых",
    slug: "dlya-vzroslyh",
  },
  {
    name: "документальный",
    slug: "dokumentalnyy",
  },
  {
    name: "драма",
    slug: "drama",
  },
  {
    name: "игра",
    slug: "igra",
  },
  {
    name: "история",
    slug: "istoriya",
  },
  {
    name: "комедия",
    slug: "komediya",
  },
  {
    name: "концерт",
    slug: "koncert",
  },
  {
    name: "короткометражка",
    slug: "korotkometrazhka",
  },
  {
    name: "криминал",
    slug: "kriminal",
  },
  {
    name: "мелодрама",
    slug: "melodrama",
  },
  {
    name: "музыка",
    slug: "muzyka",
  },
  {
    name: "мультфильм",
    slug: "multfilm",
  },
  {
    name: "мюзикл",
    slug: "myuzikl",
  },
  {
    name: "новости",
    slug: "novosti",
  },
  {
    name: "приключения",
    slug: "priklyucheniya",
  },
  {
    name: "реальное ТВ",
    slug: "realnoe-TV",
  },
  {
    name: "семейный",
    slug: "semeynyy",
  },
  {
    name: "спорт",
    slug: "sport",
  },
  {
    name: "ток-шоу",
    slug: "tok-shou",
  },
  {
    name: "триллер",
    slug: "triller",
  },
  {
    name: "ужасы",
    slug: "uzhasy",
  },
  {
    name: "фантастика",
    slug: "fantastika",
  },
  {
    name: "фильм-нуар",
    slug: "film-nuar",
  },
  {
    name: "фэнтези",
    slug: "fentezi",
  },
  {
    name: "церемония",
    slug: "ceremoniya",
  },
]

export const getFilteredFilms = (params: QueryParams) => {
  console.table(params)
}
//   httpClient.get<Films>(SLUG.films).then((data) => data)

export const getFilmDescriptionById = (id: string) =>
  httpClient
    .get<FilmDescription>("/src/shared/api/film-description.json", {
      // params: { id },
    })
    .then((data) => {
      console.log(data, id)
      return data
    })
//   httpClient.get<Films>(SLUG.films).then((data) => data)
