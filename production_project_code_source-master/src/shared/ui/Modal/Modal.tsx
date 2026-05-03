import { classNames } from "shared/lib/classNames/classNames"
import cls from "./Modal.module.scss"
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
//import { Portal } from "../Portal/Portal"
import { useTheme } from "app/providers/ThemeProviders"

interface ModalProps {
  className?: string
  children?: ReactNode
  isOpen?: boolean
  onClose?: () => void
  lazy?: boolean
}

let ANIMATION_DELAY = 300

export const Modal = (props: ModalProps) => {
  let { className, children, isOpen, onClose, lazy } = props

  let [isClosing, setIsClosing] = useState(false)
  let [isMounted, setIsMounted] = useState(false)
  let timerRef = useRef<ReturnType<typeof setTimeout>>()
  let { theme } = useTheme()

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)
    }
  }, [isOpen])

  let closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true)
      timerRef.current = setTimeout(() => {
        onClose()
        setIsClosing(false)
      }, ANIMATION_DELAY)
    }
  }, [onClose])

  let onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key == "Escape") {
        closeHandler()
      }
    },
    [closeHandler],
  )

  let onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown)
    }
    return () => {
      clearTimeout(timerRef.current)
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [isOpen, onKeyDown])

  let mods: Record<string, boolean> = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  }

  if (lazy && !isMounted) {
    return null
  }

  return (
    /*  <Portal> */
    <div className={classNames(cls.modal, mods, [className || "", theme])}>
      <div className={cls.overlay} onClick={closeHandler}>
        <div className={cls.content} onClick={onContentClick}>
          {children}
        </div>
      </div>
    </div>
    /* </Portal> */
  )
}
