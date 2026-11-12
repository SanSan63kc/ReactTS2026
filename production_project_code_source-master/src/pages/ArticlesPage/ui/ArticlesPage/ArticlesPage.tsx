import { classNames } from "shared/lib/classNames/classNames"
import cls from "./ArticlesPage.module.scss"
import { memo, useCallback } from "react"
import { ArticleList } from "entities/Article"
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
  getArticlesPageIsLoading,
  getArticlesPageView,
} from "../../model/selectors/articlesPageSelectors"
import { Page } from "widgets/Page/Page"
import { fetchNextArticlesPage } from "../../model/services/fetchNextArticlesPage/fetchNextArticlesPage"
import { initArticlesPage } from "../../model/services/initArticlesPage/initArticlesPage"
import { ArticlesPageFilters } from "../ArticlesPageFilters/ArticlesPageFilters"
import { useSearchParams } from "react-router-dom"

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
  let [searchParams] = useSearchParams()

  let onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage())
  }, [dispatch])

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams))
  })

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page
        onScrollEnd={onLoadNextPart}
        className={classNames(cls.articlesPage, {}, [className || ""])}
      >
        <ArticlesPageFilters />
        <ArticleList
          isLoading={isLoading}
          view={view}
          articles={articles}
          className={cls.list}
        />
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage)
