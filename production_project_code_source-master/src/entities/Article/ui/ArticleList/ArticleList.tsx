import { memo } from "react"
import { useTranslation } from "react-i18next"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./ArticleList.module.scss"
import { Article, ArticleView } from "../../model/types/article"
import { ArticleListItem } from "../ArticleListItem/ArticleListItem"

interface ArticleListProps {
  className?: string
  articles: Article[]
  isLoading?: boolean
  view?: ArticleView
}

export const ArticleList = memo((props: ArticleListProps) => {
  const { className, articles, view = ArticleView.SMALL, isLoading } = props
  const { t } = useTranslation()

  let renderArticle = (article: Article) => {
    return <ArticleListItem article={article} view={view} className={cls.card} key={article.id}/>
  }

  return (
    <div className={classNames(cls.articleList, {}, [className, cls[view]])}>
      {articles.length > 0 ? articles.map(renderArticle) : null}
    </div>
  )
})
