import { classNames } from "shared/lib/classNames/classNames"
import cls from "./ArticleImageBlockComponent.module.scss"
import { memo } from "react"

interface ArticleImageBlockComponentProps {
  className?: string
}

export const ArticleImageBlockComponent = memo(
  ({ className }: ArticleImageBlockComponentProps) => {
    return (
      <div
        className={classNames(cls.articleimageblockcomponent, {}, [
          className || "",
        ])}
      >
        ArticleImageBlockComponent
      </div>
    )
  },
)
