import { makeAutoObservable, runInAction } from "mobx"
import { getFilmDescriptionById, getFilms, getGenres } from "shared/api/films"
import type {
  FilmDescription,
  Films,
  Genre,
  QueryParams,
} from "shared/api/films/model"

class FilmStore {
  filmList: Films = { docs: [], total: 0, limit: 0, page: 0, pages: 0 }
  filmDescription?: FilmDescription
  isLoading = false
  filmListError = ""
  filmDescriptionError = ""
  genresError = ""
  genres?: Genre[] = []
  constructor() {
    makeAutoObservable(this)
  }

  getFilms = async (queryParams: QueryParams) => {
    try {
      this.isLoading = true
      const data = await getFilms(queryParams)
      runInAction(() => {
        this.isLoading = false

        this.filmList = data.data
      })
    } catch (error) {
      if (error instanceof Error) {
        runInAction(() => {
          this.isLoading = false
          this.filmListError = error.message
        })
      }
    }
  }

  getGenres = async () => {
    try {
      this.isLoading = true
      const data = await getGenres()
      runInAction(() => {
        this.isLoading = false
        data.unshift({ name: "Любой", slug: "any" })

        this.genres = data
      })
    } catch (error) {
      if (error instanceof Error) {
        runInAction(() => {
          this.isLoading = false
          this.genresError = error.message
        })
      }
    }
  }
  getFilmDescriptionById = async ({ id }: QueryParams) => {
    if (id) {
      try {
        this.isLoading = true
        const data = await getFilmDescriptionById(id)
        runInAction(() => {
          this.isLoading = false

          this.filmDescription = data.data
        })
      } catch (error) {
        if (error instanceof Error) {
          runInAction(() => {
            this.isLoading = false
            this.filmDescriptionError = error.message
          })
        }
      }
    }
  }
}

export const store = new FilmStore()
