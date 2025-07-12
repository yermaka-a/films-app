import { RouterProvider } from "react-router"
import { router } from "app/router"
import { AdaptivityProvider, ConfigProvider } from "@vkontakte/vkui"

function App() {
  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <RouterProvider router={router} />
      </AdaptivityProvider>
    </ConfigProvider>
  )
}

export default App
