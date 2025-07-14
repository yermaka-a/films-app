import { CardGrid, Group, Spinner } from "@vkontakte/vkui"
import { FilmModel, FilmRowCard } from "entities/film"
import AddFilm from "features/add-film/ui/ui"
import { FilmFilter } from "features/film-filter"
import type { FilterOptions } from "features/film-filter/hooks"
import { observer } from "mobx-react-lite"
import { useRef, useState } from "react"

import { ModalError } from "shared/ui/modal-error"
import { useFetch, useObserver } from "widgets/card-filtered-list/hooks"

export const CardFilteredList = observer(() => {
  const {
    store: {
      filmListError,
      getFilms,
      isLoading,
      filmList,
      genres,
      updateFilms,
    },
  } = FilmModel
  const [page, setPage] = useState(filmList.page)
  const [gOptions, setOptions] = useState<FilterOptions | null>(null)

  useFetch((options) => {
    if (options && !isVisible) {
      const { genres, ratings, years } = options as FilterOptions

      getFilms({
        "rating.imdb": `${ratings.ratingFrom}-${ratings.ratingTo}`,
        limit: 50,
        page: 1,
        type: genres.map((g) => g.name),
        year: `${years.yearFrom}-${years.yearTo}`,
      })
      setPage(1)
    }
  }, gOptions)

  const endPageRef = useRef(null)
  const { isVisible } = useObserver(endPageRef)

  useFetch((isVisible) => {
    if (isVisible && gOptions) {
      const { genres, ratings, years } = gOptions

      updateFilms({
        "rating.imdb": `${ratings.ratingFrom}-${ratings.ratingTo}`,
        limit: 50,
        page: page,
        type: genres.map((g) => g.name),
        year: `${years.yearFrom}-${years.yearTo}`,
      })

      setPage((prev) => prev + 1)
    }
  }, isVisible)

  if (filmListError) return <ModalError errorDescription={filmListError} />

  return (
    <>
      <FilmFilter
        genres={genres || []}
        getOptions={(options) => {
          const { genres, ratings, years } = options
          const slugs = genres.map((g) => g.slug)
          const oSlugs = gOptions?.genres.map((g) => g.slug)

          if (
            ratings.ratingFrom !== gOptions?.ratings.ratingFrom ||
            ratings.ratingTo !== gOptions?.ratings.ratingTo ||
            years.yearFrom !== gOptions?.years.yearFrom ||
            years.yearTo !== gOptions?.years.yearTo ||
            slugs.sort().join("") !== oSlugs?.sort().join("")
          )
            setOptions(options)
        }}
      />
      <Group style={{ display: "flex", justifyContent: "center" }}>
        <CardGrid
          padding={true}
          style={{ width: "80%", alignItems: "stretch" }}
        >
          {filmList.docs?.map(
            ({ id, genres, alternativeName, year, rating, poster }, idx) => (
              <FilmRowCard
                key={id}
                id={id}
                rating={rating}
                title={alternativeName}
                year={year}
                genres={genres}
                poster={poster}
                AddFilm={<AddFilm key={id} film={filmList.docs[idx]} />}
              />
            )
          )}

          {isLoading && <Spinner />}
          {<span ref={endPageRef} style={{ height: 1, width: "100%" }}></span>}
        </CardGrid>
      </Group>
    </>
  )
})
