import { Button, CellButton, Div, ModalCard, Title } from "@vkontakte/vkui"
import { FilmModel } from "entities/film"
import { useState } from "react"
import { createPortal } from "react-dom"

import type { Film } from "shared/api/films/model"

export default function AddFilm({ film }: { film: Film }) {
  const {
    store: { addFilmToFavourite },
  } = FilmModel

  const [open, setOpen] = useState(false)

  return (
    <>
      <CellButton
        style={{ padding: "5px" }}
        onClick={() => {
          setOpen(true)
        }}
      >
        В Избранное
      </CellButton>
      {createPortal(
        <ModalCard open={open} onClose={() => setOpen(false)}>
          <Div
            style={{
              display: "flex",
              gap: "10px",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Title>Добавить фильм в избранное?</Title>
            <Button
              style={{ padding: "5px", width: "100%" }}
              onClick={() => {
                addFilmToFavourite(film)
                setOpen(false)
              }}
            >
              Добавить
            </Button>
            <Button
              style={{ padding: "5px", width: "100%" }}
              onClick={() => {
                setOpen(false)
              }}
            >
              Отмена
            </Button>
          </Div>
        </ModalCard>,
        document.body
      )}
    </>
  )
}
