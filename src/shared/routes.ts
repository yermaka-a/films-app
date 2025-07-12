export const ROUTES = {
  HOME: "/",
  FILM: "film-description/:id",
} as const

export type PathParams = {
  [ROUTES.FILM]: {
    id: string
  }
}

declare module "react-router-dom" {
  interface Register {
    params: PathParams
  }
}
