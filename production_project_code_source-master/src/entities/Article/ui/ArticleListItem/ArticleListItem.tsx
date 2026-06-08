import { memo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./ArticleListItem.module.scss"
import {
  Article,
  ArticleBlockType,
  ArticleTextBLock,
  ArticleView,
} from "../../model/types/article"
import { Text } from "shared/ui/Text/Text"
import { Icon } from "shared/ui/Icon/Icon"
import EyeIcon from "shared/assets/icons/eye-20-20.svg"
import { Card } from "shared/ui/Card/Card"
import { Avatar } from "shared/ui/Avatar/Avatar"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent"
import { useNavigate } from "react-router-dom"
import { RoutePath } from "shared/config/routerConfig/routeConfig"

interface ArticleListItemProps {
  className?: string
  article: Article
  view: ArticleView
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const { className, article, view } = props
  const { t } = useTranslation("article")
  let navigate = useNavigate()

  let onOpenArticle = useCallback(() => {
    navigate(RoutePath.article_details + article.id)
  }, [article.id, navigate])

  let types = <Text text={article.type.join(", ")} className={cls.types} />
  let views = (
    <>
      <Text text={String(article.views)} className={cls.types} />
      <Icon Svg={EyeIcon} />
    </>
  )

  if (view === ArticleView.BIG) {
    let textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBLock

    return (
      <div
        className={classNames(cls.articleListItem, {}, [className, cls[view]])}
      >
        <Card className={cls.card}>
          <div className={cls.header}>
            <Avatar size={30} src={article.user.avatar!} />
            <Text text={article.user.username} className={cls.username} />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <Text title={article.title} className={cls.title} />
          {types}
          <img src={article.img} className={cls.img} alt={article.title}></img>
          {textBlock && (
            <ArticleTextBlockComponent
              block={textBlock}
              className={cls.textBlock}
            />
          )}
          <div className={cls.footer}>
            <Button theme={ButtonTheme.OUTLINE} onClick={onOpenArticle}>{t("Читать далее")}</Button>
            {views}
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div
      className={classNames(cls.articleListItem, {}, [className, cls[view]])}
    >
      <Card className={cls.card} onClick={onOpenArticle}>
        <div className={cls.imageWrapper}>
          <img alt={article.title} src={article.img} className={cls.img} />
          <Text text={article.createdAt} className={cls.date} />
        </div>
        <div className={cls.infoWrapper}>
          {types}
          {views}
          <Icon Svg={EyeIcon} />
        </div>
        <Text text={article.title} className={cls.title} />
      </Card>
    </div>
  )
})
