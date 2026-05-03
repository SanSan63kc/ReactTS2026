import { classNames } from "shared/lib/classNames/classNames"
import cls from "./Navbar.module.scss"
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink"
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher"
import { useTranslation } from "react-i18next"
import { Modal } from "shared/ui/Modal/Modal"
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
      <div className={classNames(cls.navbar, {}, [className || ""])}>
        <Button
          theme={ButtonTheme.CLEAR_INVERTED}
          className={cls.links}
          onClick={onLogout}
        >
          {t("Выйти")}
        </Button>
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      </div>
    )
  }

  return (
    <div className={classNames(cls.navbar, {}, [className || ""])}>
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
    </div>
  )
})
