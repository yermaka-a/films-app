import {
  CellButton,
  Div,
  FormItem,
  FormLayoutGroup,
  Group,
  Header,
  Input,
  Select,
} from "@vkontakte/vkui"
import { useState } from "react"
import type { Genre } from "shared/api/films/model"
import deleteSVG from "shared/assets/delete.png"
type FilterOptions = {
  years: { yearFrom: number; yearTo: number }
  ratings: { ratingFrom: number; ratingTo: number }
  genres: Genre[]
}

type Props = {
  genres: Genre[]
  onFilter: (options: FilterOptions) => void
}

export const FilmFilter = ({ genres, onFilter }: Props) => {
  const [yearFrom, setYearFrom] = useState<number>(1990)
  const [yearTo, setYearTo] = useState<number>(new Date().getFullYear())
  const [ratingFrom, setRatingFrom] = useState<number>(0)
  const [ratingTo, setRatingTo] = useState<number>(10)
  const [genresList, setGenresList] = useState<Genre[]>([])
  const onFilterInside = (options: FilterOptions) => {
    const currentYear = new Date().getFullYear()

    const yearFrom =
      options.years.yearFrom >= 1990 && options.years.yearFrom <= currentYear
        ? options.years.yearFrom
        : 1990

    const yearTo =
      options.years.yearTo >= yearFrom && options.years.yearTo <= currentYear
        ? options.years.yearTo
        : currentYear

    const ratingFrom =
      options.ratings.ratingFrom >= 0 &&
      options.ratings.ratingFrom <= options.ratings.ratingTo
        ? options.ratings.ratingFrom
        : 0

    const ratingTo =
      options.ratings.ratingTo >= ratingFrom && options.ratings.ratingTo <= 10
        ? options.ratings.ratingTo
        : 10

    setYearFrom(yearFrom)
    setYearTo(yearTo)
    setRatingFrom(ratingFrom)
    setRatingTo(ratingTo)
  }
  return (
    <Group>
      <Header>Фильтры</Header>
      <FormLayoutGroup
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        onBlur={() => {
          const filterOptions = {
            years: { yearFrom, yearTo },
            ratings: { ratingFrom, ratingTo },
            genres: genresList,
          }
          onFilterInside(filterOptions)
          onFilter(filterOptions)
        }}
      >
        <Div style={{ width: "80%" }}>
          <Div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              padding: "0px",
            }}
          >
            <Header>Жанры:</Header>
            <Header>Год:</Header>
            <Header>Рейтинг:</Header>
          </Div>
          <Div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              padding: "0px",
            }}
          >
            <FormItem
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <Select
                defaultValue={"any"}
                options={genres?.map((g) => ({ label: g.name, value: g.slug }))}
                onChange={(e) => {
                  setGenresList((prev) => {
                    const g = genres.find((g) => g.slug === e.target.value)
                    if (g) {
                      if (g.slug === "any") return []
                      const isExists = prev.find((genr) => genr.slug === g.slug)
                      console.log("search", g, isExists)
                      if (!isExists) {
                        return [
                          ...prev,
                          {
                            slug: g?.slug,
                            name: g?.name,
                          },
                        ]
                      }
                    }
                    return prev
                  })
                }}
              />
              {genresList.length > 0 && (
                <Div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    padding: "10px",
                    boxShadow: "1px 1px 10px 1px #C0C0C0",
                    borderRadius: "5px",
                  }}
                >
                  {genresList.map((g) => (
                    <CellButton
                      before={
                        <img
                          src={deleteSVG}
                          style={{ width: "20px" }}
                          onClick={() =>
                            setGenresList((prev) =>
                              prev.filter((genr) => genr.slug !== g.slug)
                            )
                          }
                        />
                      }
                      centered
                      key={g.slug}
                      style={{
                        display: "inline-block",
                        width: "fit-content",
                        cursor: "pointer",
                        marginRight: "2px",
                      }}
                    >
                      {g.name}
                    </CellButton>
                  ))}
                </Div>
              )}
            </FormItem>

            <FormItem
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <Input
                type="number"
                min={1990}
                max={yearTo}
                value={yearFrom}
                placeholder="Год от"
                onChange={(e) => {
                  const val = Number(e.currentTarget.value)
                  setYearFrom(val)
                }}
              />
              <Input
                type="number"
                placeholder="Год до"
                min={yearFrom}
                max={new Date().getFullYear()}
                value={yearTo}
                onChange={(e) => {
                  const val = Number(e.currentTarget.value)
                  setYearTo(val)
                }}
              />
            </FormItem>

            <FormItem
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <Input
                type="number"
                min={0}
                max={ratingTo}
                step={0.1}
                value={ratingFrom}
                onChange={(e) => {
                  const val = Number(e.currentTarget.value)
                  setRatingFrom(val)
                }}
              />
              <Input
                type="number"
                min={ratingFrom}
                max={10}
                step={0.1}
                value={ratingTo}
                onChange={(e) => {
                  const val = Number(e.currentTarget.value)
                  setRatingTo(val)
                }}
              />
            </FormItem>
          </Div>
        </Div>
      </FormLayoutGroup>
    </Group>
  )
}
