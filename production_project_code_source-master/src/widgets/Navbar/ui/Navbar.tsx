import { classNames } from "shared/lib/classNames/classNames"
import cls from "./Navbar.module.scss"
import { useTranslation } from "react-i18next"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { memo, useCallback, useState } from "react"
import { LoginModal } from "features/AuthByUserName"
import { useDispatch, useSelector } from "react-redux"
import { getUserAuthData } from "entities/User/model/selectors/getUserAuthData/getUserAuthData"
import { userActions } from "entities/User"

interface NavbarProps {
  className?: string
}

export let Navbar = memo(({ className }: NavbarProps) => {
  let { t } = useTranslation()
  let [isAuthModal, setIsAuthModal] = useState(false)
  let authData = useSelector(getUserAuthData)
  let dispatch = useDispatch()

  let onCloseModal = useCallback(() => {
    setIsAuthModal(false)
  }, [])

  let onShowModal = useCallback(() => {
    setIsAuthModal(true)
  }, [])

  let onLogout = useCallback(() => {
    dispatch(userActions.logout())
  }, [dispatch])

  if (authData) {
    return (
      <header className={classNames(cls.navbar, {}, [className || ""])}>
        <Button
          theme={ButtonTheme.BACKGROUND_INVERTED}
          className={cls.links}
          onClick={onLogout}
        >
          {t("Выйти")}
        </Button>
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      </header>
    )
  }

  return (
    <header className={classNames(cls.navbar, {}, [className || ""])}>
      <Button
        theme={ButtonTheme.CLEAR_INVERTED}
        className={cls.links}
        onClick={onShowModal}
      >
        {t("Войти")}
      </Button>
      {isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      )}
    </header>
  )
})
