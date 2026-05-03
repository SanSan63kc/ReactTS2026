import { classNames } from "shared/lib/classNames/classNames"
import cls from "./SidebarItem.module.scss"
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink"
import { RoutePath } from "shared/config/routerConfig/routeConfig"
import MainIcon from "shared/assets/icons/main-20-20.svg"
import { useTranslation } from "react-i18next"
import { SidebarItemType } from "widgets/Sidebar/model/items"
import { memo } from "react"

interface SidebarItemProps {
  item: SidebarItemType
  collapsed: boolean
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  let { t } = useTranslation()
  return (
    <AppLink theme={AppLinkTheme.SECONDARY} to={item.path} className={classNames(cls.item, {[cls.collapsed]: collapsed}) }>
      <item.Icon className={cls.icon} />
      <span className={cls.link}>{t(item.text)}</span>
    </AppLink>
  )
})
