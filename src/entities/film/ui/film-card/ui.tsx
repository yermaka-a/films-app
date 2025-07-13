import { Caption, Card, Div, Group, Title, Text, Image } from "@vkontakte/vkui"
import type { FilmDescription } from "shared/api/films/model"

export const FilmCard = ({
  description,
  genres,
  alternativeName,
  enName,
  name,
  poster,
  rating,
  year,
}: Pick<
  FilmDescription,
  | "description"
  | "genres"
  | "enName"
  | "alternativeName"
  | "name"
  | "poster"
  | "rating"
  | "year"
>) => {
  return (
    <Div
      style={{
        margin: "0 auto",
      }}
    >
      <Card
        mode="shadow"
        style={{
          border: 8,
          width: "fit-content",
          display: "flex",
          flexDirection: "column",
          maxWidth: "1200px",
        }}
      >
        <Div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 0,
          }}
        >
          <Image
            alt="Название фильма"
            src={poster?.url && poster?.previewUrl}
            style={{
              width: "fit-content",
              height: "100%",
              objectFit: "cover",
              marginBottom: "10px",
            }}
          />
          <Title level="2" style={{ marginBottom: 4 }}>
            {name || alternativeName || enName}
          </Title>
        </Div>
        <Div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: 0,
            gap: 10,
          }}
        >
          <Caption style={{ marginBottom: 8 }}></Caption>
          <Text style={{ display: "flex", gap: 5 }} weight="1">
            Рейтинг:
            <Text>
              {`imdb: ${rating?.imdb || 0}, `}
              {`Кинопоиск: ${rating?.kp || 0}, `}
              {`рос.критики: ${rating?.russianFilmCritics || 0}, `}
              {`ресторанные критики: ${rating?.filmCritics || 0}`}
            </Text>
          </Text>
          <Text weight="1" style={{ display: "flex", gap: 5 }}>
            Описание:
          </Text>
          <Text weight="3" style={{ textAlign: "justify" }}>
            {description || `Нет`}
          </Text>
          <Text weight="1">Дата выхода: {year || `Неизвестна`}</Text>
          <Group>
            <Div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {genres?.map((g) => (
                <Caption
                  key={g.name}
                  style={{
                    backgroundColor: "#e1e3e6",
                    padding: "4px 8px",
                    borderRadius: 12,
                  }}
                >
                  {g.name}
                </Caption>
              ))}
            </Div>
          </Group>
        </Div>
      </Card>
    </Div>
  )
}
