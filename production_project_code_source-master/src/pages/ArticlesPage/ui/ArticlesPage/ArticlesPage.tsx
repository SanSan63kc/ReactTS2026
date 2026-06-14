import { classNames } from "shared/lib/classNames/classNames"
import cls from "./ArticlesPage.module.scss"
import { memo, useCallback } from "react"
import { ArticleList, ArticleView, ArticleViewSelector } from "entities/Article"
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import {
  articlesPageActions,
  articlesPageReducer,
  getArticles,
} from "../../model/slices/articlePageSlice"
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect"
import { useAppDispatch } from "app/providers/StoreProvider"
import { useSelector } from "react-redux"
import {
  getArticlesPageError,
  getArticlesPageHasMore,
  getArticlesPageIsLoading,
  getArticlesPageNum,
  getArticlesPageView,
} from "../../model/selectors/articlesPageSelectors"
import { Page } from "shared/ui/Page/Page"
import { fetchNextArticlesPage } from "../../model/services/fetchNextArticlesPage/fetchNextArticlesPage"
import { initArticlesPage } from "../../model/services/initArticlesPage/initArticlesPage"

interface ArticlesPageProps {
  className?: string
}

let reducers: ReducersList = {
  articlesPage: articlesPageReducer,
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  let dispatch = useAppDispatch()
  let articles = useSelector(getArticles.selectAll)
  let isLoading = useSelector(getArticlesPageIsLoading)
  let view = useSelector(getArticlesPageView)
  let error = useSelector(getArticlesPageError)
  let page = useSelector(getArticlesPageNum)
  let hasMore = useSelector(getArticlesPageHasMore)

  let onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view))
    },
    [dispatch],
  )

  let onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage())
  }, [dispatch])

  useInitialEffect(() => {
    dispatch(initArticlesPage())
  })

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page
        onScrollEnd={onLoadNextPart}
        className={classNames(cls.articlesPage, {}, [className || ""])}
      >
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
        <ArticleList isLoading={isLoading} view={view} articles={articles} />
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage)
