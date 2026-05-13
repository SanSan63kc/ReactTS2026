import { classNames } from "shared/lib/classNames/classNames"
import cls from "./ArticleDetailsPage.module.scss"
import { useTranslation } from "react-i18next"
import { memo } from "react"
import { ArticleDetails } from "entities/Article"
import { useParams } from "react-router-dom"
import { Text } from "shared/ui/Text/Text"
import { CommentList } from "entities/Comment"

interface ArticleDetailsPageProps {
  className?: string
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  let { t } = useTranslation("article")
  let { id } = useParams<{ id: string }>()

  if (!id) {
    return (
      <div
        className={classNames(cls.articleDetailsPage, {}, [className || ""])}
      >
        {t("Статья не найдена")}
      </div>
    )
  }

  return (
    <div className={classNames(cls.articleDetailsPage, {}, [className || ""])}>
      <ArticleDetails id={id} />
      <Text className={cls.commentTitle} title={t("Комментарии")} />
      <CommentList isLoading comments={[]}/>
    </div>
  )
}

export default memo(ArticleDetailsPage)
