import { memo } from "react"
import { useTranslation } from "react-i18next"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./AddCommentForm.module.scss"

interface AddCommentFormProps {
  className?: string
}

export const AddCommentForm = memo((props: AddCommentFormProps) => {
  const { className } = props
  const { t } = useTranslation()

  return (
    <div className={classNames(cls.addCommentForm, {}, [className])}>
      add comment form
    </div>
  )
})
