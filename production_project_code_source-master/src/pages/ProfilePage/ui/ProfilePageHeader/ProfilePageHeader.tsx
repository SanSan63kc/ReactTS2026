import { classNames } from "shared/lib/classNames/classNames"
import cls from "./ProfilePageHeader.module.scss"
import { Text } from "shared/ui/Text/Text"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { useTranslation } from "react-i18next"

interface ProfilePageHeaderProps {
  className?: string
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
  let { t } = useTranslation("profile")

  return (
    <div className={classNames(cls.profilePageHeader, {}, [className || ""])}>
      <Text title={t("Профиль пользователя")}></Text>
      <Button theme={ButtonTheme.OUTLINE} className={cls.editBtn}>
        {t("Редактировать")}
      </Button>
    </div>
  )
}
