import { classNames } from "shared/lib/classNames/classNames"
import cls from "./ProfilePage.module.scss"
import { useTranslation } from "react-i18next"
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { profileReducer } from "entities/Profile"

let reducers: ReducersList = {
  profile: profileReducer,
}

interface ProfilePageProps {
  className?: string
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  let { t } = useTranslation()
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.profilepage, {}, [className || ""])}>
        {t("Страница профиля")}
      </div>
    </DynamicModuleLoader>
  )
}

export default ProfilePage
