import { useState } from "react"
import { useSearchParams } from "react-router"
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

export const useSearchFilteredParams = () => {
  const [params, setSearchParams] = useSearchParams()
  const [opts, setOptions] = useState<FilterOptions>()

  const setOpts = (options: FilterOptions) => {
    setOptions(options)
    setSearchParams({
      type: options.genres.map((g) => g.slug),
      rating: `${options.ratings.ratingFrom}-${options.ratings.ratingTo}`,
      year: `${options.years.yearFrom}-${options.years.yearTo}`,
    })
  }

  const setSearchFilteredParams = (options: FilterOptions) => {
    const {
      genres,
      ratings: { ratingFrom, ratingTo },
      years: { yearFrom, yearTo },
    } = options

    if (opts) {
      const {
        genres: g,
        ratings: { ratingFrom: rFr, ratingTo: rTo },
        years: { yearFrom: yFr, yearTo: yTo },
      } = opts

      if (
        !genres.every((genr, i) => genr.slug === g[i]?.slug) ||
        !(ratingFrom === rFr && ratingTo === rTo) ||
        !(yearFrom === yFr && yearTo === yTo)
      ) {
        {
          setOpts(options)
        }
      }
    } else {
      setOpts(options)
    }
  }
  return { params, opts, setSearchFilteredParams } as const
}
