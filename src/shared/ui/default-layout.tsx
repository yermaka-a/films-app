import { SplitLayout } from "@vkontakte/vkui"
import { Outlet } from "react-router"

export const DefaultLayout = () => {
  return (
    <SplitLayout>
      <Outlet />
    </SplitLayout>
  )
}
