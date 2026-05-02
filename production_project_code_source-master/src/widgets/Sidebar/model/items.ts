import { RoutePath } from "shared/config/routerConfig/routeConfig"
import AboutIcon from "shared/assets/icons/about-20-20.svg"
import MainIcon from "shared/assets/icons/main-20-20.svg"
import ProfileIcon from "shared/assets/icons/profile-20-20.svg"

export interface SidebarItemType {
  path: string
  text: string
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
}

export let SidebarItemsList: SidebarItemType[] = [
  { path: RoutePath.main, text: "Главная", Icon: MainIcon },
  { path: RoutePath.about, text: "О сайте", Icon: AboutIcon },
  { path: RoutePath.profile, text: "Страница профиля", Icon: ProfileIcon },
]
