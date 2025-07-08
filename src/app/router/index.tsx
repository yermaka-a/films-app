import { DescriptionFilmPage } from "pages"
import { FilmsListPage } from "pages"
import { createBrowserRouter } from "react-router"
import { DefaultLayout } from "shared"

export const ROUTER = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <FilmsListPage />,
      },
      {
        path: "/:id",
        element: <DescriptionFilmPage />,
      },
    ],
  },
])
