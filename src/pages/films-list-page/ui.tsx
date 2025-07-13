import { Panel, PanelHeader, Title } from "@vkontakte/vkui"
import { FilmModel } from "entities/film"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"

import { Link } from "react-router"
import { ROUTES } from "shared/routes"
import { CardFilteredList } from "widgets/card-filtered-list"

export const FilmsListPage = observer(() => {
  const {
    store: { getGenres },
  } = FilmModel

  useEffect(() => {
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
      </PanelHeader>
      <CardFilteredList />
    </Panel>
  )
})
