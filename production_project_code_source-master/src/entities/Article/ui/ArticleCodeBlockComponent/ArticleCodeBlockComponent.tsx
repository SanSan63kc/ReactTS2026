import { classNames } from "shared/lib/classNames/classNames"
import cls from "./ArticleCodeBlockComponent.module.scss"
import { memo } from "react"
import { ArticleCodeBlock } from "../../model/types/article"
import { Code } from "shared/ui/Code/Code"

interface ArticleCodeBlockComponentProps {
  className?: string
  block: ArticleCodeBlock
}

export const ArticleCodeBlockComponent = memo(
  (props: ArticleCodeBlockComponentProps) => {
    let { className, block } = props

    return (
      <div
        className={classNames(cls.Articlecodeblockcomponent, {}, [
          className || "",
        ])}
      >
        <Code text={block.code} />
      </div>
    )
  },
)
