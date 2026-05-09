import { classNames } from "shared/lib/classNames/classNames"
import cls from "./ArticleDetails.module.scss"

interface ArticleDetailsProps {
  className?: string
}

export const ArticleDetails = ({ className }: ArticleDetailsProps) => {
  return (
    <div className={classNames(cls.articledetails, {}, [className || ""])}>
      ArticleDetails
    </div>
  )
}
