import { CardGrid, Group, Spinner } from "@vkontakte/vkui"
import { FilmModel, FilmRowCard } from "entities/film"
import AddFilm from "features/add-film/ui/ui"
import { FilmFilter } from "features/film-filter"
import type { FilterOptions } from "features/film-filter/hooks"
import { observer } from "mobx-react-lite"
import { useEffect, useRef, useState } from "react"

import { ModalError } from "shared/ui/modal-error"

export const CardFilteredList = observer(() => {
  const {
    store: { filmListError, getFilms, isLoading, filmList, genres },
  } = FilmModel
  const [curPage, setCurPage] = useState(1)
  const [gOptions, setOptions] = useState<FilterOptions | null>(null)
  const endPageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (endPageRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = endPageRef.current
        if (scrollTop + clientHeight >= scrollHeight) {
          setCurPage((prev) => prev + 1)
        }
      }
    }

    const container = endPageRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  useEffect(() => {
    if (gOptions) {
      const { genres, ratings, years } = gOptions
      getFilms({
        "rating.imdb": `${ratings.ratingFrom}-${ratings.ratingTo}`,
        limit: 50,
        page: curPage,
        type: genres.map((g) => g.slug).filter((s) => s !== "any"),
        year: `${years.yearFrom}-${years.yearTo}`,
      })
    }
  }, [gOptions, curPage])

  if (filmListError) return <ModalError errorDescription={filmListError} />

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <FilmFilter
        genres={genres || []}
        getOptions={(options) => {
          setOptions(options)
        }}
      />
      <Group style={{ display: "flex", justifyContent: "center" }}>
        <CardGrid
          getRootRef={endPageRef}
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
        </CardGrid>
      </Group>
    </>
  )
})
