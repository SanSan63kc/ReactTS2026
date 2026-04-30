import { classNames } from "shared/lib/classNames/classNames"
import cls from "./Button.module.scss"
import { ButtonHTMLAttributes, FC } from "react"

export enum ButtonTheme {
  CLEAR = "clear",
  CLEAR_INVERTED = "clearInverted",
  OUTLINE = "outline",
  BACKGROUND = "background",
  BACKGROUND_INVERTED = "backgroundInverted",
}

export enum ButtonSize {
  M = "size_m",
  L = "size_l",
  XL = "size_xl",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ButtonTheme
  square?: boolean
  size?: ButtonSize
  disabled?: boolean
}

export let Button: FC<ButtonProps> = (props) => {
  let {
    className,
    children,
    theme,
    square,
    disabled,
    size = ButtonSize.M,
    ...otherProps
  } = props

  let mods: Record<string, boolean> = {
    [cls[theme!]]: !!theme,
    [cls.square]: !!square,
    [cls[size]]: true,
    [cls.disabled]: !!disabled,
  }

  return (
    <button
      type="button"
      className={classNames(cls.button, mods, [className || ""])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  )
}
