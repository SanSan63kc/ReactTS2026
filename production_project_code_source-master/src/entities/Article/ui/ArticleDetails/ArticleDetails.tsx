import { classNames } from "shared/lib/classNames/classNames"
import cls from "./ArticleDetails.module.scss"
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { articleDetailsReducer } from "../../model/slice/articleDetailsSlice"
import { memo, useEffect } from "react"
import { useAppDispatch } from "app/providers/StoreProvider"
import { fetchArticleById } from "../../model/services/fetchArticleByID/fetchArticleByID"
import { useSelector } from "react-redux"
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from "../../model/selectors/articleDetails"
import { Text, textAlign } from "shared/ui/Text/Text"
import { t } from "i18next"
import { Skeleton } from "shared/ui/Skeleton/Skeleton"

interface ArticleDetailsProps {
  className?: string
  id: string
}

let reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
}

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  let { className, id } = props

  let dispatch = useAppDispatch()

  let article = useSelector(getArticleDetailsData)
  //let isLoading = useSelector(getArticleDetailsIsLoading)
  let isLoading = true
  let error = useSelector(getArticleDetailsError)

  useEffect(() => {
    dispatch(fetchArticleById(id))
  }, [dispatch, id])

  let content

  if (isLoading) {
    content = (
      <div>
        <Skeleton
          className={cls.avatar}
          width={200}
          height={200}
          border={"50%"}
        />
        <Skeleton className={cls.title} width={300} height={32} />
        <Skeleton className={cls.skeleton} width={600} height={200} />
        <Skeleton className={cls.skeleton} width={"100%"} height={200} />
        <Skeleton className={cls.skeleton} width={"100%"} height={200} />
      </div>
    )
  } else if (error) {
    content = (
      <Text
        align={textAlign.CENTER}
        title={t("Произошла ошибка при загрузке статьи")}
      />
    )
  } else {
    content = <div> ArticleDetails</div>
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
      <div className={classNames(cls.articleDetails, {}, [className || ""])}>
        {content}
      </div>
    </DynamicModuleLoader>
  )
})
