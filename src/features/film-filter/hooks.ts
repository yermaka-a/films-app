import { useState } from "react"
import type { Genre } from "shared/api/films/model"

export type FilterOptions = {
  years: { yearFrom: number; yearTo: number }
  ratings: { ratingFrom: number; ratingTo: number }
  genres: Genre[]
}

export const useFilteredOptions = () => {
  const [yearFrom, setYearFrom] = useState<number>(1990)
  const [yearTo, setYearTo] = useState<number>(new Date().getFullYear())
  const [ratingFrom, setRatingFrom] = useState<number>(0)
  const [ratingTo, setRatingTo] = useState<number>(10)
  const [genresList, setGenresList] = useState<Genre[]>([])

  const onFilterInside = (options: FilterOptions) => {
    const currentYear = new Date().getFullYear()

    const yearFrom =
      options.years.yearFrom >= 1990 && options.years.yearFrom <= currentYear
        ? options.years.yearFrom
        : 1990

    const yearTo =
      options.years.yearTo >= yearFrom && options.years.yearTo <= currentYear
        ? options.years.yearTo
        : currentYear

    const ratingFrom =
      options.ratings.ratingFrom >= 0 &&
      options.ratings.ratingFrom <= options.ratings.ratingTo
        ? options.ratings.ratingFrom
        : 0

    const ratingTo =
      options.ratings.ratingTo >= ratingFrom && options.ratings.ratingTo <= 10
        ? options.ratings.ratingTo
        : 10

    options = {
      genres: options.genres,
      ratings: { ratingFrom: ratingFrom, ratingTo: ratingTo },
      years: { yearFrom: yearFrom, yearTo: yearTo },
    }
    setYearFrom(yearFrom)
    setYearTo(yearTo)
    setRatingFrom(ratingFrom)
    setRatingTo(ratingTo)
    return options
  }

  return {
    yearFrom,
    yearTo,
    ratingFrom,
    ratingTo,
    setRatingTo,
    setRatingFrom,
    setYearTo,
    setYearFrom,
    genresList,
    setGenresList,
    onFilterInside,
  }
}
