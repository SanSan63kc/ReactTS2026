import { classNames } from "shared/lib/classNames/classNames"
import cls from "./ThemeSwitcher.module.scss"
import { Theme, useTheme } from "app/providers/ThemeProviders"
import LightIcon from "shared/assets/icons/theme-light.svg"
import DarkIcon from "shared/assets/icons/theme-dark.svg"
import { Button, ButtonTheme } from "shared/ui/Button/Button"

interface ThemeSwitcherProps {
  className?: string
}

export let ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  let { theme, toggleTheme } = useTheme()
  return (
    <div className={classNames(cls.themeSwitcher, {}, [className || ""])}>
      <Button
        theme={ButtonTheme.CLEAR}
        className={classNames(cls.ThemeSwitcher, {}, [className || ""])}
        onClick={toggleTheme}
      >
        {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
      </Button>
    </div>
  )
}
