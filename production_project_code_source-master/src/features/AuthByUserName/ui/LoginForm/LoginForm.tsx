import { classNames } from "shared/lib/classNames/classNames"
import cls from "./LoginForm.module.scss"
import { useTranslation } from "react-i18next"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { Input } from "shared/ui/Input/Input"
import { useSelector } from "react-redux"
import { memo, useCallback } from "react"
import {
  loginActions,
  loginReducer,
} from "features/AuthByUserName/model/slice/loginSlice"
import { loginByUsername } from "features/AuthByUserName/model/services/loginByUsername/loginByUsername"
import { AppDispatch } from "../../../../../src/app/providers/StoreProvider/config/store" // проверь путь
import { Text, TextTheme } from "shared/ui/Text/Text"
import { getLoginUsername } from "../../model/selectors/getLoginUsername/getLoginUsername"
import { getLoginPassword } from "../../model/selectors/getLOginPassword/getLoginPassword"
import { getLoginError } from "../../model/selectors/getLoginError/getLoginError"
import { getLoginIsLoading } from "../../model/selectors/getLoginIsLoading/getLoginIsLoading"
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch"

export interface LoginFormProps {
  className?: string
  onSuccess: () => void
}

let initialReducers: ReducersList = {
  loginForm: loginReducer,
}

let LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
  let { t } = useTranslation()
  const dispatch = useAppDispatch()
  let username = useSelector(getLoginUsername)
  let password = useSelector(getLoginPassword)
  let error = useSelector(getLoginError)
  let isLoading = useSelector(getLoginIsLoading)

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

  const onLoginClick = useCallback(async () => {
    let result = await dispatch(loginByUsername({ username, password }))
    if (result.meta.requestStatus === "fulfilled") {
      onSuccess()
    }
  }, [dispatch, password, username, onSuccess])

  return (
    <DynamicModuleLoader removeAfterUnmount={true} reducers={initialReducers}>
      <div className={classNames(cls.loginform, {}, [className || ""])}>
        <Text title={t("Форма авторизации")} />
        {error && <Text text={error} theme={TextTheme.ERROR} />}
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
    </DynamicModuleLoader>
  )
})

export default LoginForm
