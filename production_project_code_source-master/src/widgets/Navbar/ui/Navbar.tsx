import { classNames } from "shared/lib/classNames/classNames"
import cls from "./Navbar.module.scss"
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink"
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher"
import { useTranslation } from "react-i18next"

interface NavbarProps {
  className?: string
}

export let Navbar = ({ className }: NavbarProps) => {
  let { t } = useTranslation()
  return (
    <div className={classNames(cls.navbar, {}, [className || ""])}>
      <div className={cls.links}>
        /
      </div>
    </div>
  )
}
