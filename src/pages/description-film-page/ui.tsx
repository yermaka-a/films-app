import { FilmCard, FilmModel } from "entities/film"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import type { PathParams, ROUTES } from "shared/routes"
import { ModalError } from "shared/ui/modal-error"

export const DescriptionFilmPage = observer(() => {
  const params = useParams<PathParams[typeof ROUTES.FILM]>()

  const {
    store: { filmDescriptionError, filmDescription, getFilmDescriptionById },
  } = FilmModel

  useEffect(() => {
    if (params["id"]) getFilmDescriptionById({ id: params["id"] })
  }, [])
  if (filmDescriptionError)
    return <ModalError errorDescription={filmDescriptionError} />
  if (filmDescription)
    return (
      <FilmCard
        description={filmDescription.description}
        genres={filmDescription.genres}
        rating={filmDescription.rating}
        alternativeName={filmDescription.alternativeName}
        name={filmDescription.name}
        year={filmDescription.year}
        poster={filmDescription.poster}
        enName={filmDescription.enName}
      />
    )
})
