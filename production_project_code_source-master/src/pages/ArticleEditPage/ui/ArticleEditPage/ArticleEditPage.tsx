import { memo } from "react"
import { useTranslation } from "react-i18next"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./ArticleEditPage.module.scss"
import { useParams } from "react-router-dom"
import { Page } from "widgets/Page/Page"

interface ArticleEditPageProps {
  className?: string
}

const ArticleEditPage = memo((props: ArticleEditPageProps) => {
  const { className } = props
  const { t } = useTranslation()
  let { id } = useParams<{ id: string }>()
  let isEdit = Boolean(id)

  return (
    <Page className={classNames(cls.articleEditPage, {}, [className])}>
      {isEdit ? t("Редактирование статьи с ID = ") + id : t("Создание новой статьи")}
    </Page>
  )
})

export default ArticleEditPage
