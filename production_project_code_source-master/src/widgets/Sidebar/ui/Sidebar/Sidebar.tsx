import { classNames } from "shared/lib/classNames/classNames"
import cls from "./Sidebar.module.scss"
import { memo, useMemo, useState } from "react"
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher"
import { LangSwitcher } from "shared/ui/LangSwitcher"
import { Button, ButtonSize, ButtonTheme } from "shared/ui/Button/Button"
import { SidebarItemsList } from "widgets/Sidebar/model/items"
import { SidebarItem } from "../SidebarItem/SidebarItem"

interface SidebarProps {
  className?: string
}

export let Sidebar = memo(() => {
  let [collapsed, setCollapsed] = useState(false)

  let onToggle = () => {
    setCollapsed((prev) => !prev)
  }

  let itemsList = useMemo(() => {
    return SidebarItemsList.map((item) => (
      <SidebarItem item={item} collapsed={collapsed} key={item.path} />
    ))
  }, [collapsed])

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
      <div className={cls.items}>{itemsList}</div>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher short={collapsed} className={cls.lang} />
      </div>
    </div>
  )
})
