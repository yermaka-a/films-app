export const ROUTES = {
  ROOT: "/",
  HOME: "/home",
  FILM: "film-description/:id",
  FAVOURITE: "favourite",
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
