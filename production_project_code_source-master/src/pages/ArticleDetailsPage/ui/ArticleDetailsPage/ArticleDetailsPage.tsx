import { classNames } from "shared/lib/classNames/classNames"
import cls from "./ArticleDetailsPage.module.scss"
import { useTranslation } from "react-i18next"
import { memo, useCallback } from "react"
import { ArticleDetails, ArticleList } from "entities/Article"
import { useNavigate, useParams } from "react-router-dom"
import { Text, TextSize } from "shared/ui/Text/Text"
import { CommentList } from "entities/Comment"
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { getArticleComments } from "../../model/slices/articleDetailsCommentSlice"
import { useSelector } from "react-redux"
import { getArticleCommentsIsLoading } from "../../model/selectors/comments"
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect"
import { useAppDispatch } from "app/providers/StoreProvider"
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId"
import { AddCommentForm } from "features/addCommentForm"
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { RoutePath } from "shared/config/routerConfig/routeConfig"
import { Page } from "widgets/Page/Page"
import { getArticleRecommendations } from "../../model/slices/articleDetailsPageRecommendationsSlice"
import { getArticleRecommendationsIsLoading } from "../../model/selectors/recomendations"
import { fetchArticleRecommendations } from "../../model/services/fetchArticleRecommendations/fetchArticleRecommendations"
import { articleDetailsPageReducer } from "../../model/slices"
import { ArticleDetailsPageHeader } from "../ArticleDetailsPageHeader/ArticleDetailsPageHeader"

interface ArticleDetailsPageProps {
  className?: string
}

let reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  let { t } = useTranslation("article")
  let { id } = useParams<{ id: string }>()
  let comments = useSelector(getArticleComments.selectAll)
  let commentsIsLoading = useSelector(getArticleCommentsIsLoading)
  let recommendations = useSelector(getArticleRecommendations.selectAll)
  let recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading)
  let dispatch = useAppDispatch()

  let onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text))
    },
    [dispatch],
  )

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id))
    dispatch(fetchArticleRecommendations())
  })

  if (!id) {
    return (
      <Page
        className={classNames(cls.articleDetailsPage, {}, [className || ""])}
      >
        {t("Статья не найдена")}
      </Page>
    )
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page
        className={classNames(cls.articleDetailsPage, {}, [className || ""])}
      >
        <ArticleDetailsPageHeader />
        <ArticleDetails id={id} />
        <Text
          size={TextSize.L}
          className={cls.commentTitle}
          title={t("Рекомендуем")}
        />
        <ArticleList
          className={cls.recommendations}
          articles={recommendations}
          isLoading={recommendationsIsLoading}
          target={"_blank"}
        />
        <Text
          size={TextSize.L}
          className={cls.commentTitle}
          title={t("Комментарии")}
        />
        <AddCommentForm onSendComment={onSendComment} />
        <CommentList isLoading={commentsIsLoading} comments={comments} />
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
