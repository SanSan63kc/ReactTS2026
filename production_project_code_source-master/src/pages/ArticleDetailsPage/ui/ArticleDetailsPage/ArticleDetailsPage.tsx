import { classNames } from "shared/lib/classNames/classNames"
import cls from "./ArticleDetailsPage.module.scss"
import { useTranslation } from "react-i18next"
import { memo, useCallback } from "react"
import { ArticleDetails } from "entities/Article"
import { useNavigate, useNavigation, useParams } from "react-router-dom"
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
  getArticleCommentsIsLoading,
} from "../../model/selectors/comments"
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect"
import { useAppDispatch } from "app/providers/StoreProvider"
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId"
import { AddCommentForm } from "features/addCommentForm"
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { RoutePath } from "shared/config/routerConfig/routeConfig"
import { Page } from "shared/ui/Page/Page"

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
  let navigate =  useNavigate()

  let onBackToList = useCallback(()=>{
    navigate(RoutePath.articles)
  }, [])

  let onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text))
  }, [dispatch])

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id))
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
        <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
          {t("Назад к списку")}
        </Button>
        <ArticleDetails id={id} />
        <Text className={cls.commentTitle} title={t("Комментарии")} />
        <AddCommentForm onSendComment={onSendComment}/>
        <CommentList isLoading={commentsIsLoading} comments={comments} />
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
