import { memo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./ArticlesPageFilters.module.scss"
import {
  ArticleSortField,
  ArticleSortSelector,
  ArticleView,
  ArticleViewSelector,
  ArticleTypeTabs
} from "entities/Article"
import { useSelector } from "react-redux"
import {
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
  getArticlesPageView,
} from "../../model/selectors/articlesPageSelectors"
import { useAppDispatch } from "app/providers/StoreProvider"
import { articlesPageActions } from "../../model/slices/articlePageSlice"
import { Card } from "shared/ui/Card/Card"
import { Input } from "shared/ui/Input/Input"
import { SortOrder } from "shared/types"
import { fetchArticlesList } from "../../model/services/fetchArticlesList/fetchArticlesList"
import { useDebounce } from "shared/lib/hooks/useDebounce/useDebounce"
import { ArticleType } from "entities/Article/model/types/article"

interface ArticlesPageFiltersProps {
  className?: string
}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
  const { className } = props
  const { t } = useTranslation()
  let dispatch = useAppDispatch()
  let view = useSelector(getArticlesPageView)
  let sort = useSelector(getArticlesPageSort)
  let order = useSelector(getArticlesPageOrder)
  let search = useSelector(getArticlesPageSearch)
  let type = useSelector(getArticlesPageType)

  let fetchData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }))
  }, [dispatch])

  let debouncedFetchData = useDebounce(fetchData, 500)

  let onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view))
    },
    [dispatch],
  )

  let onChangeSort = useCallback(
    (newSort: ArticleSortField) => {
      dispatch(articlesPageActions.setSort(newSort))
      dispatch(articlesPageActions.setPage(1))
      fetchData()
    },
    [dispatch, fetchData],
  )

  let onChangeOrder = useCallback(
    (newOrder: SortOrder) => {
      dispatch(articlesPageActions.setOrder(newOrder))
      dispatch(articlesPageActions.setPage(1))
      fetchData()
    },
    [dispatch, fetchData],
  )

  let onChangeSearch = useCallback(
    (search: string) => {
      dispatch(articlesPageActions.setSearch(search))
      dispatch(articlesPageActions.setPage(1))
      debouncedFetchData()
    },
    [dispatch, debouncedFetchData],
  )

  let onChangeType = useCallback(
    (value: ArticleType) => {
      dispatch(articlesPageActions.setType(value))
      dispatch(articlesPageActions.setPage(1))
      fetchData()
    },
    [dispatch, fetchData],
  )

 

  return (
    <div className={classNames(cls.articlesPageFilters, {}, [className])}>
      <div className={cls.sortWrapper}>
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
      </div>
      <Card className={cls.search}>
        <Input
          onChange={onChangeSearch}
          value={search}
          placeholder={t("Поиск")}
        />
      </Card>
      <ArticleTypeTabs value={type} onChangeType={onChangeType} className={cls.tabs}></ArticleTypeTabs>
    </div>
  )
})
