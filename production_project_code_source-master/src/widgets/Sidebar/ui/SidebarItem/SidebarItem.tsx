import { classNames } from "shared/lib/classNames/classNames"
import cls from "./SidebarItem.module.scss"
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink"
import { useTranslation } from "react-i18next"
import { SidebarItemType } from "widgets/Sidebar/model/items"
import { memo } from "react"
import { useSelector } from "react-redux"
import { getUserAuthData } from "entities/User/model/selectors/getUserAuthData/getUserAuthData"
import { Icon } from "shared/ui/Icon/Icon"

interface SidebarItemProps {
  item: SidebarItemType
  collapsed: boolean
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  let { t } = useTranslation()
  let isAuth = useSelector(getUserAuthData)

  if (item.authOnly && !isAuth){
    return null
  }

  return (
    <AppLink
      theme={AppLinkTheme.SECONDARY}
      to={item.path}
      className={classNames(cls.item, { [cls.collapsed]: collapsed })}
    >
      <Icon Svg={item.Icon} className={cls.icon} />
      {/* <item.Icon className={cls.icon} /> */}
      <span className={cls.link}>{t(item.text)}</span>
    </AppLink>
  )
})
