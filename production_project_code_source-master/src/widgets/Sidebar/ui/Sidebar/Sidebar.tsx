import { classNames } from "shared/lib/classNames/classNames"
import cls from "./Sidebar.module.scss"
import { useState } from "react"
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher"
import { LangSwitcher } from "shared/ui/LangSwitcher"
import { Button, ButtonSize, ButtonTheme } from "shared/ui/Button/Button"
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink"
import { useTranslation } from "react-i18next"
import { RoutePath } from "shared/config/routerConfig/routeConfig"
import AboutIcon from "shared/assets/icons/about-20-20.svg"
import MainIcon from "shared/assets/icons/main-20-20.svg"

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
        <AppLink
          theme={AppLinkTheme.SECONDARY}
          to={RoutePath.main}
          className={cls.item}
        >
          <MainIcon className={cls.icon} />
          <span className={cls.link}>{t("Главная")}</span>
        </AppLink>
        <AppLink
          theme={AppLinkTheme.SECONDARY}
          to={RoutePath.about}
          className={cls.item}
        >
          <AboutIcon className={cls.icon} />
          <span className={cls.link}>{t("О сайте")}</span>
        </AppLink>
      </div>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher short={collapsed} className={cls.lang} />
      </div>
    </div>
  )
}
