import { classNames } from "shared/lib/classNames/classNames"
import cls from "./ProfilePage.module.scss"
import { useTranslation } from "react-i18next"

interface ProfilePageProps {
  className?: string
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  let { t } = useTranslation()
  return (
    <div className={classNames(cls.profilepage, {}, [className || ""])}>
        {t("Страница профиля")}
    </div>
  )
}

export default ProfilePage
