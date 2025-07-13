import { Panel, PanelHeader, Title } from "@vkontakte/vkui"
import { FilmModel } from "entities/film"
import { useEffect } from "react"

import { Link } from "react-router"
import { ROUTES } from "shared/routes"
import { CardFilteredList } from "widgets/card-filtered-list"

export const FilmsListPage = () => {
  const {
    store: { getFilms, getGenres },
  } = FilmModel

  useEffect(() => {
    getFilms({
      "rating.imdb": `0-10`,
      year: `1990-${new Date().getFullYear()}`,
      limit: 50,
      page: 1,
    })
    getGenres()
  }, [])

  return (
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
        <CardFilteredList />
      </PanelHeader>
    </Panel>
  )
}
