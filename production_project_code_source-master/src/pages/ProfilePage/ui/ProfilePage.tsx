import { classNames } from "shared/lib/classNames/classNames"
import cls from "./ProfilePage.module.scss"
import { useTranslation } from "react-i18next"
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { fetchProfileData, getProfileData, getProfileError, getProfileIsLoading, ProfileCard, profileReducer } from "entities/Profile"
import { useEffect } from "react"
import { AppDispatch, useAppDispatch } from "app/providers/StoreProvider"
import { useSelector } from "react-redux"
import { ProfilePageHeader } from "./ProfilePageHeader/ProfilePageHeader"

let reducers: ReducersList = {
  profile: profileReducer,
}

interface ProfilePageProps {
  className?: string
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  let { t } = useTranslation()
  const dispatch = useAppDispatch() as AppDispatch

  let data = useSelector(getProfileData)
  let isLoading = useSelector(getProfileIsLoading)
  let error = useSelector(getProfileError)

  useEffect(() => {
    dispatch(fetchProfileData())
  }, [dispatch])

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.profilepage, {}, [className || ""])}>
        <ProfilePageHeader/>
        <ProfileCard data={data} isLoading={isLoading} error={error}/>
      </div>
    </DynamicModuleLoader>
  )
}

export default ProfilePage
