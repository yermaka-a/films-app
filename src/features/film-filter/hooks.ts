import { useState } from "react"
import { useSearchParams } from "react-router-dom"

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

    const newYearFrom =
      options.years.yearFrom >= 1990 && options.years.yearFrom <= currentYear
        ? options.years.yearFrom
        : 1990

    const newYearTo =
      options.years.yearTo >= newYearFrom && options.years.yearTo <= currentYear
        ? options.years.yearTo
        : currentYear

    const newRatingFrom =
      options.ratings.ratingFrom >= 0 &&
      options.ratings.ratingFrom <= options.ratings.ratingTo
        ? options.ratings.ratingFrom
        : 0

    const newRatingTo =
      options.ratings.ratingTo >= newRatingFrom &&
      options.ratings.ratingTo <= 10
        ? options.ratings.ratingTo
        : 10

    const newGenres = options.genres
    const slugs = newGenres.map((g) => g.slug)
    const oSlugs = genresList?.map((g) => g.slug)

    const isSameGenres = slugs.sort().join("") === oSlugs?.sort().join("")

    if (
      isSameGenres &&
      newYearFrom === yearFrom &&
      newYearTo === yearTo &&
      newRatingFrom === ratingFrom &&
      newRatingTo === ratingTo
    ) {
      return {
        genres: newGenres,
        ratings: { ratingFrom: newRatingFrom, ratingTo: newRatingTo },
        years: { yearFrom: newYearFrom, yearTo: newYearTo },
      }
    }

    setYearFrom(newYearFrom)
    setYearTo(newYearTo)
    setRatingFrom(newRatingFrom)
    setRatingTo(newRatingTo)
    setGenresList(newGenres)

    return {
      genres: newGenres,
      ratings: { ratingFrom: newRatingFrom, ratingTo: newRatingTo },
      years: { yearFrom: newYearFrom, yearTo: newYearTo },
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

      const slugs = genres.map((g) => g.slug)
      const oSlugs = g?.map((g) => g.slug)

      const isSameGenres = slugs.sort().join("") === oSlugs?.sort().join("")

      if (
        !isSameGenres ||
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
