import { FilmModel, FilmRowCard } from "entities/film"
import { useEffect } from "react"
import { CardGrid, Group, Panel, PanelHeader, Spinner } from "@vkontakte/vkui"
import { observer } from "mobx-react-lite"
import { FilmFilter } from "features/film-filter"

export const FilmsListPage = observer(() => {
  const {
    store: { filmListError, getFilms, isLoading, filmList, getGenres, genres },
  } = FilmModel

  useEffect(() => {
    getFilms({
      "rating.imdb": "5",
      types: [],
      year: "2020-2025",
      limit: 50,
      page: 1,
    })
    getGenres()
  }, [])

  if (filmListError) return
  return isLoading ? (
    <Spinner />
  ) : (
    <Panel>
      <PanelHeader>Фильмы</PanelHeader>
      <FilmFilter
        genres={genres || []}
        getOptions={(options) => {
          console.log("options", options)
        }}
      />
      <Group style={{ display: "flex", justifyContent: "center" }}>
        <CardGrid padding={true} style={{ width: "80%" }}>
          {filmList.docs?.map(
            ({ id, genres, alternativeName, year, rating, poster }) => (
              <FilmRowCard
                key={id}
                rating={rating}
                title={alternativeName}
                year={year}
                genres={genres}
                poster={poster}
              />
            )
          )}
        </CardGrid>
      </Group>
    </Panel>
  )
})
