import { classNames } from "shared/lib/classNames/classNames"
import cls from "./ArticleDetailsPage.module.scss"
import { useTranslation } from "react-i18next"
import { memo } from "react"
import { ArticleDetails } from "entities/Article"
import { useParams } from "react-router-dom"
import { Text } from "shared/ui/Text/Text"
import { CommentList } from "entities/Comment"
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import {
  articleDetailsCommentReducer,
  getArticleComments,
} from "../../model/slices/articleDetailsCommentSlice"
import { useSelector } from "react-redux"
import {
  getArticleCommentsError,
  getArticleCommentsIsLoading,
} from "../../model/selectors/comments"
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect"
import { useAppDispatch } from "app/providers/StoreProvider"
import { fetchCommentsByArticleId } from "pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId"
import { AddCommentForm } from "features/addCommentForm"

interface ArticleDetailsPageProps {
  className?: string
}

let reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentReducer,
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  let { t } = useTranslation("article")
  let { id } = useParams<{ id: string }>()
  let comments = useSelector(getArticleComments.selectAll)
  let commentsIsLoading = useSelector(getArticleCommentsIsLoading)
  let dispatch = useAppDispatch()

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id))
  })

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
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div
        className={classNames(cls.articleDetailsPage, {}, [className || ""])}
      >
        <ArticleDetails id={id} />
        <Text className={cls.commentTitle} title={t("Комментарии")} />
        <AddCommentForm />
        <CommentList isLoading={commentsIsLoading} comments={comments} />
      </div>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
