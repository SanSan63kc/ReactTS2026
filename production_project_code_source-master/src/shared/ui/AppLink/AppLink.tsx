import { classNames } from "shared/lib/classNames/classNames"
import cls from "./AppLink.module.scss"
import { Link, LinkProps } from "react-router-dom"
import { FC, memo, ReactNode } from "react"

export enum AppLinkTheme {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  RED = "red",
}

interface AppLinkProps extends LinkProps {
  className?: string
  theme?: AppLinkTheme
  children?: ReactNode
}

export let AppLink: FC<AppLinkProps> = memo((props) => {
  let {
    to,
    className,
    children,
    theme = AppLinkTheme.PRIMARY,
    ...otherProps
  } = props
  return (
    <Link
      to={to}
      className={classNames(cls.appLink, { [cls[theme]]: true }, [
        className || "",
      ])}
      {...otherProps}
    >
      {children}
    </Link>
  )
})
