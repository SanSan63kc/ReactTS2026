import { classNames } from "shared/lib/classNames/classNames"
import cls from "./PageError.module.scss"
import { useTranslation } from "react-i18next"
import { Button } from "shared/ui/Button/Button"

interface PageErrorProps {
  className?: string
}

export const PageError = ({ className }: PageErrorProps) => {
  let { t } = useTranslation()

let reloadPage = () =>{
    location.reload()
}

  return (
    <div className={classNames(cls.pageError, {}, [className || ""])}>
      <p>{t("Произошла непредвиденная ошибка")}</p>
      <Button onClick={reloadPage}>
        {t("Обновить страницу")}
      </Button>
    </div>
  )
}
