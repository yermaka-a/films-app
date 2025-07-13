import { DescriptionFilmPage } from "pages"
import { FilmsListPage } from "pages"
import { FavouritePage } from "pages/favourite-page"
import { createBrowserRouter, redirect } from "react-router"
import { DefaultLayout } from "shared"
import { ROUTES } from "shared/routes"

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <FilmsListPage />,
      },
      {
        path: ROUTES.FILM,
        element: <DescriptionFilmPage />,
      },
      {
        path: ROUTES.FAVOURITE,
        element: <FavouritePage />,
      },
    ],
  },
  {
    path: ROUTES.ROOT,
    loader: () => redirect(ROUTES.HOME),
  },
])
