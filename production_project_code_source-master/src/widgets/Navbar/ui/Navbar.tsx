import { classNames } from "shared/lib/classNames/classNames"
import cls from "./Navbar.module.scss"
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink"
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher"
import { useTranslation } from "react-i18next"
import { Modal } from "shared/ui/Modal/Modal"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { useCallback, useState } from "react"
import { LoginModal } from "features/AuthByUserName"

interface NavbarProps {
  className?: string
}

export let Navbar = ({ className }: NavbarProps) => {
  let { t } = useTranslation()
  let [isAuthModal, setIsAuthModal] = useState(false)
  let onCloseModal = useCallback(() => {
    setIsAuthModal(false)
  }, [])
  let onShowModal = useCallback(() => {
    setIsAuthModal(true)
  }, [])
  return (
    <div className={classNames(cls.navbar, {}, [className || ""])}>
      <Button
        theme={ButtonTheme.CLEAR_INVERTED}
        className={cls.links}
        onClick={onShowModal}
      >
        {t("Войти")}
      </Button>
      <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
    </div>
  )
}
