import { Caption, Card, Div, Title, Text, Image } from "@vkontakte/vkui"
import { type Genre, type Posters, type Rating } from "shared/api/films/model"
type Props = {
  title: string
  year: number
  rating: Rating
  poster: Posters
  genres: Genre[]
}

export const FilmRowCard = ({ title, year, rating, genres, poster }: Props) => {
  return (
    <Card
      mode="shadow"
      style={{
        borderRadius: 12,
        overflow: "hidden",
        height: 550,
      }}
    >
      <Image
        src={poster?.url || poster?.previewUrl}
        alt={title}
        style={{ width: "100%", height: 420, objectFit: "cover" }}
      />
      <Div style={{ padding: "12px 16px" }}>
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
