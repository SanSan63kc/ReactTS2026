import { classNames } from "shared/lib/classNames/classNames"
import cls from "./ArticleDetails.module.scss"
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { articleDetailsReducer } from "../../model/slice/articleDetailsSlice"

interface ArticleDetailsProps {
  className?: string
}

let reducers: ReducersList = {
  articleDetails: articleDetailsReducer
}

export const ArticleDetails = ({ className }: ArticleDetailsProps) => {
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
      <div className={classNames(cls.articledetails, {}, [className || ""])}>
        ArticleDetails
      </div>
    </DynamicModuleLoader>
  )
}
