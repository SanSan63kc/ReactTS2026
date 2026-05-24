import { createSelector } from "@reduxjs/toolkit"
import { getUserAuthData } from "entities/User"
import { RoutePath } from "shared/config/routerConfig/routeConfig"
import { SidebarItemType } from "../types/sidebar"
import AboutIcon from "shared/assets/icons/about-20-20.svg"
import MainIcon from "shared/assets/icons/main-20-20.svg"
import ProfileIcon from "shared/assets/icons/profile-20-20.svg"
import ArticleIcon from "shared/assets/icons/article-20-20.svg"

export let getSidebarItems = createSelector(getUserAuthData, (userData) => {
  let sidebarItemsList: SidebarItemType[] = [
    { path: RoutePath.main, text: "Главная", Icon: MainIcon },
    { path: RoutePath.about, text: "О сайте", Icon: AboutIcon },
  ]

  if (userData) {
    sidebarItemsList.push(
      {
        path: RoutePath.profile + userData?.id,
        text: "Страница профиля",
        Icon: ProfileIcon,
        authOnly: true,
      },
      {
        path: RoutePath.articles,
        text: "Статьи",
        Icon: ArticleIcon,
        authOnly: true,
      },
    )
  }

  return sidebarItemsList
})
