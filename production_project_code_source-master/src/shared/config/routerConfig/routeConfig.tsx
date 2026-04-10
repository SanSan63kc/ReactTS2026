import AboutPage from "pages/AboutPage/ui/AboutPage"
import MainPage from "pages/MainPage/ui/MainPage"
import { RouteProps } from "react-router-dom"

export enum AppRoutes {
  MAIN = "main",
  ABOUT = "about",
}

export let RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: "/",
    [AppRoutes.ABOUT]: "/about",
}

export let routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage/>
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPage/>
    } 
}