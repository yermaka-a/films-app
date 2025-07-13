import { Caption, Card, Div, Title, Text, Image } from "@vkontakte/vkui"
import { href, Link } from "react-router"

import { type Genre, type Posters, type Rating } from "shared/api/films/model"
import { ROUTES } from "shared/routes"

type Props = {
  AddFilm?: React.ReactNode
  title: string
  id: number
  year: number
  rating: Rating
  poster: Posters
  genres: Genre[]
}

export const FilmRowCard = ({
  AddFilm,
  title,
  year,
  rating,
  id,
  genres,
  poster,
}: Props) => {
  return (
    <Card
      mode="shadow"
      style={{
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <Link
        style={{ height: "max-content", cursor: "pointer" }}
        to={{
          pathname:
            ROUTES.HOME +
            ROUTES.ROOT +
            href(ROUTES.FILM, { id: id.toFixed(0) }),
        }}
      >
        <Image
          src={poster?.url || poster?.previewUrl}
          alt={title}
          style={{
            width: "100%",
            height: 420,
            objectFit: "cover",
            position: "relative",
          }}
        />
      </Link>
      <Div
        style={{
          padding: "12px 16px",
        }}
      >
        {AddFilm ? AddFilm : null}
        <Title level="3" weight="2" style={{ marginBottom: 4 }}>
          {title} ({year})
        </Title>
        {rating && (
          <Caption weight="2" style={{ color: "#4CAF50", marginBottom: 8 }}>
            Рейтинг: {rating.imdb}
          </Caption>
        )}
        {genres && genres.length > 0 && (
          <Text weight="2" style={{ marginBottom: 4 }}>
            Жанры: {genres.map((g) => g.name).join(", ")}
          </Text>
        )}
      </Div>
    </Card>
  )
}
