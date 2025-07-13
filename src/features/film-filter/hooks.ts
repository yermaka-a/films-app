import { useState } from "react"
import { useSearchParams } from "react-router-dom"

import type { Genre } from "shared/api/films/model"

export type FilterOptions = {
  yearFrom: number
  yearTo: number
  ratingFrom: number
  ratingTo: number
  genres: Genre[] | ((prev: Genre[]) => Genre[])
}

export const useFilteredOptions = () => {
  const [yearFrom, setYearFrom] = useState<number>(1990)
  const [yearTo, setYearTo] = useState<number>(new Date().getFullYear())
  const [ratingFrom, setRatingFrom] = useState<number>(0)
  const [ratingTo, setRatingTo] = useState<number>(10)
  const [genresList, setGenresList] = useState<Genre[]>([])

  const onFilterInside = (options: Partial<FilterOptions>) => {
    const currentYear = new Date().getFullYear()
    if (options.yearFrom) {
      const newYearFrom =
        options.yearFrom >= 1990 && options.yearFrom <= currentYear
          ? options.yearFrom
          : 1990
      setYearFrom(newYearFrom)
    }
    if (options.yearTo) {
      const newYearTo =
        options.yearTo >= yearFrom && options.yearTo <= currentYear
          ? options.yearTo
          : currentYear
      setYearTo(newYearTo)
    }
    if (options.ratingFrom) {
      const newRatingFrom =
        options.ratingFrom >= 0 && options.ratingFrom <= ratingTo
          ? options.ratingFrom
          : 0
      setRatingFrom(newRatingFrom)
    }
    if (options.ratingTo) {
      const newRatingTo =
        options.ratingTo >= ratingFrom && options.ratingTo <= 10
          ? options.ratingTo
          : 10
      setRatingTo(newRatingTo)
    }

    if (options.genres) {
      setGenresList(options.genres)
    }

    return {
      genres: genresList,
      ratingFrom,
      ratingTo,
      yearFrom,
      yearTo,
    }
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
  const [searchParams, setSearchParams] = useSearchParams()

  const [opts, setOptions] = useState<FilterOptions | undefined>()

  const setOpts = (
    options: Omit<FilterOptions, "genres"> & { genres: Genre[] }
  ) => {
    setOptions(options)
    setSearchParams({
      type: options.genres.map((g) => g.slug),
      rating: `${options.ratingFrom}-${options.ratingTo}`,
      year: `${options.yearFrom}-${options.yearTo}`,
    })
  }

  const setSearchFilteredParams = (
    options: Omit<FilterOptions, "genres"> & { genres: Genre[] }
  ) => {
    const { genres, ratingFrom, ratingTo, yearFrom, yearTo } = options

    if (opts) {
      const {
        genres: g,
        ratingFrom: rFr,
        ratingTo: rTo,
        yearFrom: yFr,
        yearTo: yTo,
      } = opts

      if (
        !(g.length === genres.length) ||
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
  return { searchParams, opts, setSearchFilteredParams } as const
}
