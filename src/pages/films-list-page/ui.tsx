import { FilmModel, FilmRowCard } from "entities/film"
import { useEffect } from "react"
import {
  CardGrid,
  Group,
  Panel,
  PanelHeader,
  Spinner,
  Title,
} from "@vkontakte/vkui"
import { observer } from "mobx-react-lite"
import { FilmFilter } from "features/film-filter"
import { ModalError } from "shared/ui/modal-error"
import { Link } from "react-router"
import { ROUTES } from "shared/routes"
import AddFilm from "features/add-film/ui/ui"

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

  if (filmListError) return <ModalError errorDescription={filmListError} />
  return isLoading ? (
    <Spinner />
  ) : (
    <Panel>
      <PanelHeader
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Title style={{ display: "inline-block", marginRight: "30px" }}>
          {" "}
          Фильмы
        </Title>
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={ROUTES.FAVOURITE}
        >
          Избранное
        </Link>
      </PanelHeader>
      <FilmFilter
        genres={genres || []}
        getOptions={(options) => {
          console.log("options", options)
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
        </CardGrid>
      </Group>
    </Panel>
  )
})
