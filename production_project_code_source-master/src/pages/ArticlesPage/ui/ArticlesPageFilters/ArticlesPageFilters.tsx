import { memo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./ArticlesPageFilters.module.scss"
import { ArticleView, ArticleViewSelector } from "entities/Article"
import { useSelector } from "react-redux"
import { getArticlesPageView } from "pages/ArticlesPage/model/selectors/articlesPageSelectors"
import { useAppDispatch } from "app/providers/StoreProvider"
import { articlesPageActions } from "pages/ArticlesPage/model/slices/articlePageSlice"
import { Select } from "shared/ui/Select/Select"
import { Card } from "shared/ui/Card/Card"
import { Input } from "shared/ui/Input/Input"

interface ArticlesPageFiltersProps {
  className?: string
}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
  const { className } = props
  const { t } = useTranslation()
  let view = useSelector(getArticlesPageView)
  let dispatch = useAppDispatch()

  let onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view))
    },
    [dispatch],
  )

  return (
    <div className={classNames(cls.articlesPageFilters, {}, [className])}>
      <div className={cls.sortWrapper}>
        <Select label={t("Сортировать по")} />
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
      </div>
      <Card className={cls.search}>
        <Input placeholder={t("Поиск")}/>
      </Card>
    </div>
  )
})
