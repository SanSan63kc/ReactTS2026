import { classNames } from "shared/lib/classNames/classNames"
import cls from "./ArticleCodeBlockComponent.module.scss"
import { memo } from "react"

interface ArticleCodeBlockComponentProps {
  className?: string
}

export const ArticleCodeBlockComponent = memo(
  ({ className }: ArticleCodeBlockComponentProps) => {
    return (
      <div
        className={classNames(cls.Articlecodeblockcomponent, {}, [
          className || "",
        ])}
      >
        ArticleCodeBlockComponent
      </div>
    )
  },
)
