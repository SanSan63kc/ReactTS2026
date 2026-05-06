import { classNames, Mods } from "shared/lib/classNames/classNames"
import cls from "./ProfileCard.module.scss"
import { useTranslation } from "react-i18next"
import { Text, textAlign, TextTheme } from "shared/ui/Text/Text"
import { Input } from "shared/ui/Input/Input"
import { Profile } from "entities/Profile/model/types/profile"
import { Loader } from "shared/ui/Loader/Loader"
import { Avatar } from "shared/ui/Avatar/Avatar"
import { Currency } from "entities/Currency/model/types/currency"
import { CurrencySelect } from "entities/Currency"
import { Country } from "shared/const/common"

interface ProfileCardProps {
  className?: string
  data?: Profile
  error?: string
  isLoading?: boolean
  readonly?: boolean
  onChangeFirstname?: (value?: string) => void
  onChangeLastname?: (value?: string) => void
  onChangeAge?: (value?: string) => void
  onChangeCity?: (value?: string) => void
  onChangeUsername?: (value?: string) => void
  onChangeAvatar?: (value?: string) => void
  onChangeCurrency?: (currency: Currency) => void
  onChangeCountry?: (country: Country) => void
}

export const ProfileCard = (props: ProfileCardProps) => {
  let {
    className,
    data,
    isLoading,
    error,
    readonly,
    onChangeFirstname,
    onChangeLastname,
    onChangeAge,
    onChangeCity,
    onChangeUsername,
    onChangeAvatar,
    onChangeCurrency,
    onChangeCountry,
  } = props
  let { t } = useTranslation("profile")

  if (isLoading) {
    return (
      <div
        className={classNames(cls.profileCard, { [cls.loading]: true }, [
          className,
        ])}
      >
        <Loader />
      </div>
    )
  }

  if (error) {
    return (
      <div className={classNames(cls.profileCard, {}, [className, cls.error])}>
        <Text
          theme={TextTheme.ERROR}
          title={t("Произошла ошибка при загрузке профиля")}
          text={t("Попробуйте обновить страницу")}
          align={textAlign.CENTER}
        />
      </div>
    )
  }

  let mods: Mods = {
    [cls.editing]: !readonly,
  }

  return (
    <div className={classNames(cls.profileCard, mods, [className])}>
      <div className={cls.data}>
        {data?.avatar && (
          <div className={cls.avatarWrapper}>
            <Avatar src={data?.avatar} alt="аватар пользователя" />
          </div>
        )}
        <Input
          value={data?.first}
          placeholder={t("Ваше имя")}
          className={cls.input}
          onChange={onChangeFirstname}
          readonly={readonly}
        />
        <Input
          value={data?.lastname}
          placeholder={t("Ваша фамилия")}
          className={cls.input}
          onChange={onChangeLastname}
          readonly={readonly}
        />

        <Input
          value={data?.age}
          placeholder={t("Возраст")}
          className={cls.input}
          onChange={onChangeAge}
          readonly={readonly}
        />

        <Input
          value={data?.city}
          placeholder={t("Город")}
          className={cls.input}
          onChange={onChangeCity}
          readonly={readonly}
        />

        <Input
          value={data?.username}
          placeholder={t("Ник")}
          className={cls.input}
          onChange={onChangeUsername}
          readonly={readonly}
        />

        <Input
          value={data?.avatar}
          placeholder={t("Введите ссылку на аватар")}
          className={cls.input}
          onChange={onChangeAvatar}
          readonly={readonly}
        />

        <CurrencySelect
          value={data?.currency}
          onChange={onChangeCurrency}
          readonly={readonly}
        />
      </div>
    </div>
  )
}
