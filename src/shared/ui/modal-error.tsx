import { ModalCard } from "@vkontakte/vkui"
import { useState } from "react"

type Props = {
  errorDescription: string
}

export const ModalError = ({ errorDescription }: Props) => {
  const [open, setOpen] = useState(true)
  return (
    <ModalCard open={open} onClose={() => setOpen(false)}>
      <div style={{ width: "100%", height: 100 }}>{errorDescription}</div>
    </ModalCard>
  )
}
