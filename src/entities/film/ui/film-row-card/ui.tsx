import { Caption, Card, Div, Title, Text } from "@vkontakte/vkui"

type Props = {
  title: string
  year: number
  rate: number
  posterUrl: string
  genres: { genre: string }[]
}

export const FilmRowCard = ({ title, year, rate, genres, posterUrl }: Props) => {
  return (
    <Card mode="shadow" style={{ borderRadius: 12, overflow: "hidden" }}>
      <img
        src={posterUrl}
        alt={title}
        style={{ width: "100%", height: 420, objectFit: "cover" }}
      />
      <Div style={{ padding: "12px 16px" }}>
        <Title level="3" weight="2" style={{ marginBottom: 4 }}>
          {title} ({year})
        </Title>
        {rate && (
          <Caption weight="2" style={{ color: "#4CAF50", marginBottom: 8 }}>
            Рейтинг: {rate.toFixed(1)}
          </Caption>
        )}
        {genres && genres.length > 0 && (
          <Text weight="2" style={{ marginBottom: 4 }}>
            Жанры: {genres.map((g) => g.genre).join(", ")}
          </Text>
        )}
      </Div>
    </Card>
  )
}
