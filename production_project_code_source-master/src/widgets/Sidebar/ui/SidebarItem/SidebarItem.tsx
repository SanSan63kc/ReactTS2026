import { classNames } from "shared/lib/classNames/classNames"
import cls from "./SidebarItem.module.scss"
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink"
import { RoutePath } from "shared/config/routerConfig/routeConfig"
import MainIcon from "shared/assets/icons/main-20-20.svg"
import { useTranslation } from "react-i18next"
import { SidebarItemType } from "widgets/Sidebar/model/items"

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed: boolean;
}

export const SidebarItem = ({item, collapsed}: SidebarItemProps) => {
  let { t } = useTranslation()
  return (
    <AppLink
      theme={AppLinkTheme.SECONDARY}
      to={item.path}
      className={cls.item}
    >
      <item.Icon className={cls.icon} />
      <span className={cls.link}>{t(item.text)}</span>
    </AppLink>
  )
}
