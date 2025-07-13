import { CardGrid, Group, Panel, PanelHeader, Title } from "@vkontakte/vkui"
import { FilmModel, FilmRowCard } from "entities/film"
import { Link } from "react-router"
import { ROUTES } from "shared/routes"

export const FavouritePage = () => {
  const {
    store: { favouriteFilmList },
  } = FilmModel

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
          Избранное
        </Title>
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={ROUTES.HOME}
        >
          Фильмы
        </Link>
      </PanelHeader>

      <Group style={{ display: "flex", justifyContent: "center" }}>
        <CardGrid style={{ width: "50%" }}>
          {favouriteFilmList.length ? (
            favouriteFilmList?.map(
              ({ id, genres, alternativeName, year, rating, poster }) => (
                <FilmRowCard
                  key={id}
                  id={id}
                  rating={rating}
                  title={alternativeName}
                  year={year}
                  genres={genres}
                  poster={poster}
                />
              )
            )
          ) : (
            <Title style={{ color: "grey" }}>Список пуст!</Title>
          )}
        </CardGrid>
      </Group>
    </Panel>
  )
}
