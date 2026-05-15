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
  getProfileValidateErrors,
  profileActions,
  ProfileCard,
  profileReducer,
  ValidateProfileError,
} from "entities/Profile"
import { useCallback, useEffect } from "react"
import { AppDispatch, useAppDispatch } from "app/providers/StoreProvider"
import { useSelector } from "react-redux"
import { ProfilePageHeader } from "./ProfilePageHeader/ProfilePageHeader"
import { Currency } from "entities/Currency"
import { Country } from "entities/Country"
import { Text, TextTheme } from "shared/ui/Text/Text"
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect"
import { useParams } from "react-router-dom"

let reducers: ReducersList = {
  profile: profileReducer,
}

interface ProfilePageProps {
  className?: string
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  let { t } = useTranslation("profile")
  const dispatch = useAppDispatch() as AppDispatch

  let formData = useSelector(getProfileForm)
  let isLoading = useSelector(getProfileIsLoading)
  let error = useSelector(getProfileError)
  let readonly = useSelector(getProfileReadonly)
  let validateErrors = useSelector(getProfileValidateErrors)
  let { id } = useParams<{ id: string }>()

  let validateErrorTranslates = {
    [ValidateProfileError.SERVER_ERROR]: t("Серверная ошибка при сохранении"),
    [ValidateProfileError.INCORRECT_AGE]: t("Некорректный возраст"),
    [ValidateProfileError.INCORRECT_USER_DATA]: t("Имя и фамилия обязательны"),
    [ValidateProfileError.NO_DATA]: t("Нет данных"),
    [ValidateProfileError.INCORRECT_COUNTRY]: t("Не выбрана страна"),
  }

  useInitialEffect(() => {
    if (id) {
      dispatch(fetchProfileData(id))
    }
  })

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

  let onChangeCurrency = useCallback(
    (currency?: Currency) => {
      dispatch(profileActions.updateProfile({ currency }))
    },
    [dispatch],
  )

  let onChangeCountry = useCallback(
    (country?: Country) => {
      dispatch(profileActions.updateProfile({ country }))
    },
    [dispatch],
  )

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.profilepage, {}, [className || ""])}>
        <ProfilePageHeader />

        {validateErrors?.length &&
          validateErrors.map((err) => (
            <Text
              theme={TextTheme.ERROR}
              text={validateErrorTranslates[err]}
              key={err}
            />
          ))}

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
          onChangeCurrency={onChangeCurrency}
          onChangeCountry={onChangeCountry}
        />
      </div>
    </DynamicModuleLoader>
  )
}

export default ProfilePage
