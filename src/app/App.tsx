import { RouterProvider } from "react-router"
import { ROUTER } from "app/router"

function App() {
  return (
    <>
      <RouterProvider router={ROUTER} />
    </>
  )
}

export default App
