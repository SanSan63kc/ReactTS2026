import { classNames } from "shared/lib/classNames/classNames"
import cls from "./LangSwitcher.module.scss"
import { useTranslation } from "react-i18next"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { memo } from "react"

interface LangSwitcherProps {
  className?: string
  short?: boolean
}

export let LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
  let { t, i18n } = useTranslation()

  let toggle = () => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru")
  }
  return (
    <Button
      className={classNames(cls.langSwitcher, {}, [className || ""])}
      theme={ButtonTheme.CLEAR}
      onClick={toggle}
    >
      {short ? t("Короткий язык") : t("Язык")}
    </Button>
  )
})
