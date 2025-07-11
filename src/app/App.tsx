import { RouterProvider } from "react-router"
import { ROUTER } from "app/router"
import { AdaptivityProvider, ConfigProvider } from "@vkontakte/vkui"

function App() {
  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <RouterProvider router={ROUTER} />
      </AdaptivityProvider>
    </ConfigProvider>
  )
}

export default App
