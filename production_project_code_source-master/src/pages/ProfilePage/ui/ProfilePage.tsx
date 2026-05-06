import { classNames } from "shared/lib/classNames/classNames"
import cls from "./ProfilePage.module.scss"
import { useTranslation } from "react-i18next"
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import {
  fetchProfileData,
  getProfileData,
  getProfileError,
  getProfileForm,
  getProfileIsLoading,
  getProfileReadonly,
  profileActions,
  ProfileCard,
  profileReducer,
} from "entities/Profile"
import { useCallback, useEffect } from "react"
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

  let formData = useSelector(getProfileForm)
  let isLoading = useSelector(getProfileIsLoading)
  let error = useSelector(getProfileError)
  let readonly = useSelector(getProfileReadonly)

  useEffect(() => {
    dispatch(fetchProfileData())
  }, [dispatch])

  let onChangeFirstname = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ first: value || "" }))
    },
    [dispatch],
  )

  let onChangeLastname = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ lastname: value || "" }))
    },
    [dispatch],
  )

  let onChangeAge = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ age: Number(value || 0) }))
    },
    [dispatch],
  )

  let onChangeCity = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ city: value || "" }))
    },
    [dispatch],
  )

  let onChangeUsername = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ username: value || "" }))
    },
    [dispatch],
  )

  let onChangeAvatar = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ avatar: value || "" }))
    },
    [dispatch],
  )

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.profilepage, {}, [className || ""])}>
        <ProfilePageHeader />
        <ProfileCard
          data={formData}
          isLoading={isLoading}
          error={error}
          readonly={readonly}
          onChangeFirstname={onChangeFirstname}
          onChangeLastname={onChangeLastname}
          onChangeAge={onChangeAge}
          onChangeCity={onChangeCity}
          onChangeUsername={onChangeUsername}
          onChangeAvatar={onChangeAvatar}
        />
      </div>
    </DynamicModuleLoader>
  )
}

export default ProfilePage
