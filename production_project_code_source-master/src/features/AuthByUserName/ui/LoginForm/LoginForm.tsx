import { classNames } from "shared/lib/classNames/classNames"
import cls from "./LoginForm.module.scss"
import { useTranslation } from "react-i18next"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { Input } from "shared/ui/Input/Input"
import { useDispatch, useSelector } from "react-redux"
import { memo, useCallback } from "react"
import { getLoginState } from "features/AuthByUserName/model/selectors/getLoginState/getLoginState"
import { loginActions } from "features/AuthByUserName/model/slice/loginSlice"
import { loginByUsername } from "features/AuthByUserName/model/services/loginByUsername/loginByUsername"
import { AppDispatch } from "../../../../../src/app/providers/StoreProvider/config/store" // проверь путь
import { Text, TextTheme } from "shared/ui/Text/Text"

interface LoginFormProps {
  className?: string
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
  let { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  let { username, password, error, isLoading } = useSelector(getLoginState)

  let onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUsername(value))
    },
    [dispatch],
  )

  let onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value))
    },
    [dispatch],
  )

  const onLoginClick = useCallback(() => {
    dispatch(loginByUsername({ username, password }))
  }, [dispatch, password, username])

  return (
    <div className={classNames(cls.loginform, {}, [className || ""])}>
      <Text title={t("Форма авторизации")}/>
      {error && <Text text={error} theme={TextTheme.ERROR}/>}
      <Input
        type="text"
        className={cls.input}
        placeholder={t("Введите имя пользователя")}
        autoFocus={true}
        onChange={onChangeUsername}
        value={username}
      />
      <Input
        type="text"
        className={cls.input}
        placeholder={t("Введите пароль")}
        onChange={onChangePassword}
        value={password}
      />
      <Button
        className={cls.loginBtn}
        theme={ButtonTheme.OUTLINE}
        onClick={onLoginClick}
        disabled={isLoading}
      >
        {t("Войти")}
      </Button>
    </div>
  )
})
