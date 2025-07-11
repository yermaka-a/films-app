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
import {
  useFilteredOptions,
  useSearchFilteredParams,
  type FilterOptions,
} from "features/film-filter/hooks"
import { useEffect } from "react"
import { useLocation } from "react-router"
import { toJS } from "mobx"
import type { Genre } from "shared/api/films/model"
import deleteSVG from "shared/assets/delete.png"

type Props = {
  genres: Genre[]
  getOptions: (options: FilterOptions) => void
}

export const FilmFilter = ({ genres, getOptions }: Props) => {
  const { genresList, onFilterInside, ratingFrom, ratingTo, yearFrom, yearTo } =
    useFilteredOptions()
  const location = useLocation()
  const { searchParams, setSearchFilteredParams } = useSearchFilteredParams()
  const onUpdate = () => {
    const filterOptions = {
      yearFrom,
      yearTo,
      ratingFrom,
      ratingTo,
      genres: genresList,
    }

    const options = onFilterInside(filterOptions)
    setSearchFilteredParams(options)
    getOptions(options)
  }

  // useEffect(() => {
  //   onUpdate()
  // }, [genresList])

  useEffect(() => {
    const g = searchParams.getAll("type")
    const rating = searchParams.get("rating") || "0-10"
    const year = searchParams.get("year") || "1990-2025"
    const fGrs = toJS(genres).filter((genr) => g.includes(genr.slug))

    const [ratingFrom, ratingTo] = rating.split("-").map(Number)
    const [yearFrom, yearTo] = year.split("-").map(Number)
    const options = {
      genres: fGrs,
      ratingFrom,
      ratingTo,
      yearFrom,
      yearTo,
    }

    const filteredOptions = onFilterInside(options)
    setSearchFilteredParams(filteredOptions)
  }, [location.search])
  return (
    <Group>
      <Header>Фильтры</Header>
      <FormLayoutGroup
        style={{
          display: "flex",
          justifyContent: "center",
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
                onChange={(_, newVal) => {
                  onFilterInside({
                    genres: (prev) => {
                      const ExistedG = prev.find((g) => g.slug === newVal)
                      if (!ExistedG) {
                        const g = genres.find((g) => g.slug === newVal)
                        if (g) {
                          if (g.slug === "any") return []
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
                    },
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
                          onClick={() => {
                            onFilterInside({
                              genres: (prev: Genre[]) =>
                                prev.filter((genr) => genr.slug !== g.slug),
                            })
                          }}
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
              onBlur={onUpdate}
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
                  if (val >= 1 && val <= new Date().getFullYear())
                    onFilterInside({ yearFrom: Number(val.toFixed(0)) })
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
                  onFilterInside({ yearTo: Number(val.toFixed(0)) })
                }}
              />
            </FormItem>

            <FormItem
              onBlur={onUpdate}
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
                  onFilterInside({ ratingFrom: Number(val.toFixed(1)) })
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
                  onFilterInside({ ratingTo: Number(val.toFixed(1)) })
                }}
              />
            </FormItem>
          </Div>
        </Div>
      </FormLayoutGroup>
    </Group>
  )
}
