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

  useEffect(() => {
    dispatch(fetchArticleById(id))
  }, [dispatch])

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
      <div className={classNames(cls.articledetails, {}, [className || ""])}>
        ArticleDetails
      </div>
    </DynamicModuleLoader>
  )
})
