import { classNames } from "shared/lib/classNames/classNames"
import cls from "./ArticleDetails.module.scss"
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { articleDetailsReducer } from "../../model/slice/articleDetailsSlice"
import { memo, useCallback, useEffect } from "react"
import { useAppDispatch } from "app/providers/StoreProvider"
import { fetchArticleById } from "../../model/services/fetchArticleByID/fetchArticleByID"
import { useSelector } from "react-redux"
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from "../../model/selectors/articleDetails"
import { Text, TextAlign, TextSize } from "shared/ui/Text/Text"
import { t } from "i18next"
import { Skeleton } from "shared/ui/Skeleton/Skeleton"
import { Avatar } from "shared/ui/Avatar/Avatar"
import EyeIcon from "shared/assets/icons/eye-20-20.svg"
import CalendarIcon from "shared/assets/icons/calendar-20-20.svg"
import { Icon } from "shared/ui/Icon/Icon"
import { ArticleBlock, ArticleBlockType } from "../../model/types/article"
import { ArticleCodeBlockComponent } from "../ArticleCodeBlockComponent/ArticleCodeBlockComponent"
import { ArticleImageBlockComponent } from "../ArticleImageBlockComponent/ArticleImageBlockComponent"
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent"

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
  let isLoading = useSelector(getArticleDetailsIsLoading)
  let error = useSelector(getArticleDetailsError)

  let renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
      case ArticleBlockType.CODE:
        return (
          <ArticleCodeBlockComponent
            key={block.id}
            className={cls.block}
            block={block}
          />
        )
      case ArticleBlockType.IMAGE:
        return (
          <ArticleImageBlockComponent
            key={block.id}
            className={cls.block}
            block={block}
          />
        )
      case ArticleBlockType.TEXT:
        return (
          <ArticleTextBlockComponent
            key={block.id}
            className={cls.block}
            block={block}
          />
        )
      default:
        return null
    }
  }, [])

  useEffect(() => {
    dispatch(fetchArticleById(id))
  }, [dispatch, id])

  let content

  if (isLoading) {
    content = (
      <>
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
      </>
    )
  } else if (error) {
    content = (
      <Text
        align={TextAlign.CENTER}
        title={t("Произошла ошибка при загрузке статьи")}
      />
    )
  } else {
    content = (
      <>
        <div className={cls.avatarWrapper}>
          <Avatar
            size={200}
            src={String(article?.img)}
            className={cls.avatar}
          />
        </div>

        <Text
          title={article?.title}
          text={article?.subtitle}
          className={cls.title}
          size={TextSize.L}
        />

        <div className={cls.articleInfo}>
          <Icon Svg={EyeIcon} className={cls.icon} />
          <Text text={String(article?.views)} />
        </div>
        <div className={cls.articleInfo}>
          <Icon Svg={CalendarIcon} className={cls.icon} />
          <Text text={article?.createdAt} />
        </div>

        {article?.blocks.map(renderBlock)}
      </>
    )
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
      <div className={classNames(cls.articleDetails, {}, [className || ""])}>
        {content}
      </div>
    </DynamicModuleLoader>
  )
})
