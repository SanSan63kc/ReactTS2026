import { classNames } from "shared/lib/classNames/classNames"
import cls from "./Sidebar.module.scss"
import { useState } from "react"
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher"
import { LangSwitcher } from "shared/ui/LangSwitcher"
import { Button, ButtonSize, ButtonTheme } from "shared/ui/Button/Button"
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink"
import { useTranslation } from "react-i18next"
import { RoutePath } from "shared/config/routerConfig/routeConfig"
import { SidebarItemsList } from "widgets/Sidebar/model/items"
import { SidebarItem } from "../SidebarItem/SidebarItem"


interface SidebarProps {
  className?: string
}

export let Sidebar = () => {
  let { t } = useTranslation()
  let [collapsed, setCollapsed] = useState(false)

  let onToggle = () => {
    setCollapsed((prev) => !prev)
  }
  return (
    <div
      className={classNames(
        cls.sidebar,
        { [cls.collapsed]: collapsed } /* , [
        className,
      ] */,
      )}
    >
      <Button
        onClick={onToggle}
        className={cls.collapseBtn}
        theme={ButtonTheme.BACKGROUND_INVERTED}
        size={ButtonSize.L}
        square
      >
        {collapsed ? ">" : "<"}
      </Button>
      <div className={cls.items}>

        {SidebarItemsList.map((item)=>(
          <SidebarItem item={item} collapsed={collapsed}/>
        ))}
      </div>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher short={collapsed} className={cls.lang} />
      </div>
    </div>
  )
}
