import { memo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./ArticleDetailsPageHeader.module.scss"
import { useNavigate } from "react-router-dom"
import { RoutePath } from "shared/config/routerConfig/routeConfig"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { useSelector } from "react-redux"
import { getArticleDetailsData } from "entities/Article/model/selectors/articleDetails"
import { getCanEditArticle } from "pages/ArticleDetailsPage/model/selectors/article"

interface ArticleDetailsPageHeaderProps {
  className?: string
}

export const ArticleDetailsPageHeader = memo(
  (props: ArticleDetailsPageHeaderProps) => {
    const { className } = props
    const { t } = useTranslation()
    let navigate = useNavigate()
    let canEdit = useSelector(getCanEditArticle)
    let article = useSelector(getArticleDetailsData)

    let onBackToList = useCallback(() => {
      navigate(RoutePath.articles)
    }, [])

    let onEditArticle = useCallback(() => {
      navigate(`${RoutePath.article_details}${article?.id}/edit`)
    }, [article?.id, navigate])

    return (
      <div
        className={classNames(cls.articleDetailsPageHeader, {}, [className])}
      >
        <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
          {t("Назад к списку")}
        </Button>
        {canEdit && (
          <Button
            theme={ButtonTheme.OUTLINE}
            onClick={onEditArticle}
            className={cls.editBtn}
          >
            {t("Редактировать")}
          </Button>
        )}
      </div>
    )
  },
)
