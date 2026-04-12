import { classNames } from "shared/lib/classNames/classNames"
import cls from "./Button.module.scss"
import { ButtonHTMLAttributes, FC } from "react"

export enum ThemeButton {
    CLEAR = "clear"
} 

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme? : ThemeButton;
}

export let Button: FC<ButtonProps> = (props) => {
  let { className, children, theme, ...otherProps } = props
  return (
    <button
      className={classNames(cls.button, {[cls[theme]]: true}, [className])}
      {...otherProps}
    >
        {children}
    </button>
  )
}
