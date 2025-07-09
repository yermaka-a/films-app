import { FilmModel, FilmRowCard } from "entities/film"
import { useEffect } from "react"
import { CardGrid, Group, Panel, PanelHeader, Spinner } from "@vkontakte/vkui"
import { observer } from "mobx-react-lite"
export const FilmsListPage = observer(() => {
  const {
    store: { filmListError, getFilms, isLoading, filmList },
  } = FilmModel

  useEffect(() => {
    getFilms()
  }, [])

  if (filmListError) return
  return isLoading ? (
    <Spinner />
  ) : (
    <Panel>
      <PanelHeader>Фильмы</PanelHeader>
      <Group>
        <CardGrid padding={true}>
          {filmList.items.map(
            ({
              kinopoiskId,
              genres,
              nameOriginal,
              posterUrl,
              year,
              ratingImdb,
            }) => (
              <FilmRowCard
                key={kinopoiskId}
                rate={ratingImdb}
                title={nameOriginal}
                year={year}
                genres={genres}
                posterUrl={posterUrl}
              />
            )
          )}
        </CardGrid>
      </Group>
    </Panel>
  )
})
