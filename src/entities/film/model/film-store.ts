import { type Film } from "shared/api/films/model"
import { makeAutoObservable, reaction, runInAction } from "mobx"
import {
  getFilmDescriptionById,
  getFilteredFilms,
  getGenres,
} from "shared/api/films"
import type {
  FilmDescription,
  Films,
  Genre,
  QueryParams,
} from "shared/api/films/model"

class FilmStore {
  filmList: Films = { docs: [], total: 0, limit: 50, page: 0, pages: 0 }
  filmDescription?: FilmDescription
  isLoading = false
  filmListError = ""
  filmDescriptionError = ""
  genresError = ""
  genres?: Genre[] = []
  favouriteFilmList: Film[] = []
  filmAddingError = ""
  constructor() {
    makeAutoObservable(this)

    const favourite = localStorage.getItem("favourite")
    if (favourite) {
      this.favouriteFilmList = JSON.parse(favourite)
    }

    reaction(
      () => this.favouriteFilmList.slice(),
      (favouriteFilmList) => {
        localStorage.setItem("favourite", JSON.stringify(favouriteFilmList))
      }
    )
  }


  getFilms = async (queryParams: QueryParams) => {
    try {
      this.isLoading = true
      const data = await getFilteredFilms(queryParams)
      runInAction(() => {
    
        this.filmList = data.data
        this.isLoading = false
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

  updateFilms = async (queryParams: QueryParams) => {
    try {
      this.isLoading = true
      const data = await getFilteredFilms(queryParams)
      runInAction(() => {
        const tempfilmList: Films = {
          docs: [],
          limit: 50,
          page: 0,
          pages: 0,
          total: 0,
        }
        tempfilmList.docs = this.filmList.docs
        tempfilmList.docs = tempfilmList.docs.concat(data.data.docs)

        tempfilmList.page = data.data.page
        tempfilmList.pages = data.data.pages
        tempfilmList.total = data.data.total

        this.filmList = tempfilmList
        this.isLoading = false
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
        data.data.unshift({ name: "Любой", slug: "any" })

        this.genres = data.data
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

  addFilmToFavourite = (film: Film) => {
    const filmIds = this.favouriteFilmList.map((f) => f.id)

    if (!filmIds.some((i) => i === film.id)) {
      try {
        runInAction(() => {
          this.favouriteFilmList.push(film)
          return true
        })
      } catch (error) {
        if (error instanceof Error) {
          runInAction(() => {
            this.isLoading = false
            this.filmAddingError = error.message
          })
        }
      }
    } else {
      return false
    }
  }
}

export const store = new FilmStore()
