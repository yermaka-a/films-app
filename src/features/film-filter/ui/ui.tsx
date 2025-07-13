import {
  CustomSelect,
  CustomSelectOption,
  Div,
  FormItem,
  FormLayoutGroup,
  Group,
  Header,
  Input,
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

type Props = {
  genres: Genre[]
  getOptions: (options: FilterOptions) => void
}

export const FilmFilter = ({ genres, getOptions }: Props) => {
  const location = useLocation()
  const {
    genresList,
    onFilterInside,
    ratingFrom,
    ratingTo,
    setYearFrom,
    setYearTo,
    setGenresList,
    setRatingFrom,
    setRatingTo,
    yearFrom,
    yearTo,
  } = useFilteredOptions()

  const { searchParams, setSearchFilteredParams } = useSearchFilteredParams()
  const onUpdate = () => {
    const filterOptions = {
      years: { yearFrom, yearTo },
      ratings: { ratingFrom, ratingTo },
      genres: genresList,
    }

    const options = onFilterInside(filterOptions)
    setSearchFilteredParams(options)
  }

  useEffect(() => {
    const g = searchParams.getAll("type")
    const rating = searchParams.get("rating") || "0-10"
    const year = searchParams.get("year") || "1990-2025"
    const fGrs = toJS(genres).filter((genr) => g.includes(genr.slug))

    const [ratingFrom, ratingTo] = rating.split("-").map(Number)
    const [yearFrom, yearTo] = year.split("-").map(Number)
    const options = {
      genres: fGrs,
      ratings: { ratingFrom, ratingTo },
      years: { yearFrom, yearTo },
    }
    const filteredOptions = onFilterInside(options)
    getOptions(filteredOptions)
  }, [location.search])
  return (
    <Group>
      <Header>Фильтры</Header>

      <FormLayoutGroup
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onBlur={onUpdate}
        onClick={onUpdate}
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
              <CustomSelect
                placeholder={
                  genresList.length ? "По выбранным жанрам" : "Любой"
                }
                options={genres?.map((g) => ({ label: g.name, value: g.slug }))}
                renderOption={({ option, ...restProps }) => (
                  <CustomSelectOption
                    key={option.value}
                    {...restProps}
                    before={
                      <input
                        style={{ height: "18px", width: "20px" }}
                        onClick={(e) => e.stopPropagation()}
                        type="checkbox"
                        checked={
                          (genresList.some((g) => g.slug === option.value)
                            ? true
                            : false) ||
                          (option.value === "any" && genresList.length === 0)
                        }
                        onChange={(e) => {
                          e.stopPropagation()
                          setGenresList((prev) => {
                            const g = genres.find(
                              (g) => g.slug === option.value
                            )
                            if (g) {
                              if (g.slug === "any") return []
                              if (
                                genresList.some((genr) => genr.slug === g.slug)
                              )
                                return prev.filter(
                                  (genr) => genr.slug !== g.slug
                                )
                              return [
                                ...prev,
                                {
                                  slug: g?.slug,
                                  name: g?.name,
                                },
                              ]
                            }
                            return prev
                          })
                        }}
                      />
                    }
                  />
                )}
              />
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
                  if (val >= 1 && val <= new Date().getFullYear())
                    setYearFrom(Number(val.toFixed(0)))
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
                  setYearTo(Number(val.toFixed(0)))
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
                  setRatingFrom(Number(val.toFixed(1)))
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
                  setRatingTo(Number(val.toFixed(1)))
                }}
              />
            </FormItem>
          </Div>
        </Div>
      </FormLayoutGroup>
    </Group>
  )
}
