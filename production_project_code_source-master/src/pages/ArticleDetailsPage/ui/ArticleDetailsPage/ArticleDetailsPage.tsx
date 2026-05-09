import { classNames } from "shared/lib/classNames/classNames"
import cls from "./ArticleDetailsPage.module.scss"
import { useTranslation } from "react-i18next"
import { memo } from "react"
import { ArticleDetails } from "entities/Article"

interface ArticleDetailsPageProps {
  className?: string
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  let { t } = useTranslation("article")
  return (
    <div className={classNames(cls.articledetailspage, {}, [className || ""])}>
      <ArticleDetails/>
    </div>
  )
}

export default memo(ArticleDetailsPage)
