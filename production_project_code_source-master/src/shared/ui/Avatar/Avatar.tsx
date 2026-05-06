import { classNames, Mods } from "shared/lib/classNames/classNames"
import cls from "./Avatar.module.scss"
import { CSSProperties, useMemo } from "react"

interface AvatarProps {
  className?: string
  src: string
  size?: number
  alt?: string
}

export const Avatar = (props: AvatarProps) => {
  let { className, src, size, alt } = props
  let mods: Mods = {}

  let styles = useMemo<CSSProperties>(() => {
    return {
      widht: size || 100,
      height: size || 100,
    }
  }, [size])

  return (
    <img
      src={src}
      style={styles}
      alt={alt}
      className={classNames(cls.avatar, mods, [className])}
    />
  )
}
