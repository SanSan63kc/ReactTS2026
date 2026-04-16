import { Button } from "shared/ui/Button/Button"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

// компонент для тестирования ErrorBoundary
export const BugButton = () => {
  let [error, setError] = useState(false)
  let { t } = useTranslation()

  let onThrow = () => setError(true)

  useEffect(() => {
    if (error) {
      throw new Error()
    }
  }, [error])

  return (
    <Button
      onClick={onThrow}
      /* className={classNames("", {}, [className || ""])} */
    >
      {t("Сгенерировать ошибку")}
    </Button>
  )
}
