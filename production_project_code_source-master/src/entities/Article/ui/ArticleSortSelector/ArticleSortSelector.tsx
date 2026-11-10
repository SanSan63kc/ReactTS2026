import { memo, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./ArticleSortSelector.module.scss"
import { Select, SelectOption } from "shared/ui/Select/Select"
import { ArticleSortField } from "entities/Article/model/types/article"
import { SortOrder } from "shared/types"

interface ArticleSortSelectorProps {
  className?: string
  sort: ArticleSortField
  order: SortOrder
  onChangeOrder: (newOrder: SortOrder) => void
  onChangeSort: (newSort: ArticleSortField) => void
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const { className, onChangeOrder, onChangeSort, order, sort } = props
  const { t } = useTranslation()

  let orderOptions = useMemo<SelectOption[]>(
    () => [
      {
        value: "asc",
        content: t("по возрастанию"),
      },
      {
        value: "desc",
        content: t("по убыванию"),
      },
    ],
    [t],
  )

  let sortFieldOptions = useMemo<SelectOption[]>(
    () => [
      {
        value: ArticleSortField.CREATED,
        content: t("дате создания"),
      },
      {
        value: ArticleSortField.TITLE,
        content: t("заголовку"),
      },
      {
        value: ArticleSortField.VIEWS,
        content: t("просмотрам"),
      },
    ],
    [t],
  )

  let changeSortHandler = useCallback(
    (newSort: string) => {
      onChangeSort(newSort as ArticleSortField)
    },
    [onChangeSort],
  )

  let changeOrderHandler = useCallback(
    (newOrder: string) => {
      onChangeOrder(newOrder as SortOrder)
    },
    [onChangeOrder],
  )

  return (
    <div className={classNames(cls.articleSortSelector, {}, [className])}>
      <Select
        options={sortFieldOptions}
        label={t("Сортировать по")}
        value={sort}
        onChange={changeSortHandler}
      />
      <Select
        options={orderOptions}
        label={t("по")}
        value={order}
        onChange={changeOrderHandler}
      />
    </div>
  )
})
