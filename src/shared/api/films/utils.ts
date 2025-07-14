import type { QueryParams } from "shared/api/films/model"

export const checkParams = (params: QueryParams) => {
  const urlParams = new URLSearchParams()
  if (params.page) urlParams.append("page", params.page.toString())
  if (params.limit) urlParams.append("limit", params.limit.toString())
  if (params.type)
    params.type.forEach((type) => urlParams.append("genres.name", type))
  if (params.year) urlParams.append("year", params.year.toString())
  if (params["rating.imdb"])
    urlParams.append("rating.imdb", params["rating.imdb"])

  return urlParams
}
