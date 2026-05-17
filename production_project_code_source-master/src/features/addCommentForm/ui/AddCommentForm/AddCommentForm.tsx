import { memo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./AddCommentForm.module.scss"
import { Input } from "shared/ui/Input/Input"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { useSelector } from "react-redux"
import {
  getAddCommentFormError,
  getAddCommentFormText,
} from "../../model/selectors/addCommentFormSelectors"
import { useAppDispatch } from "app/providers/StoreProvider"
import {
  addCommentFormActions,
  addCommentFormReducer,
} from "../../model/slices/addCommentFormSlice"
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"

export interface AddCommentFormProps {
  className?: string
  onSendComment: (text: string) => void
}

let reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
}

const AddCommentForm = memo((props: AddCommentFormProps) => {
  const { className, onSendComment } = props
  const { t } = useTranslation()
  let text = useSelector(getAddCommentFormText)
  let error = useSelector(getAddCommentFormError)
  let dispatch = useAppDispatch()

  let onCommentTextChange = useCallback(
    (value: string) => {
      dispatch(addCommentFormActions.setText(value))
    },
    [dispatch],
  )

  let onSendHandler = useCallback(() => {
    onSendComment(text || "")
    onCommentTextChange("")
  }, [text, onCommentTextChange, dispatch])

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cls.addCommentForm, {}, [className])}>
        <Input
          className={cls.input}
          placeholder={t("Введите текст комментария")}
          value={text}
          onChange={onCommentTextChange}
        />
        <Button theme={ButtonTheme.OUTLINE} onClick={onSendHandler}>
          {t("Отправить")}
        </Button>
      </div>
    </DynamicModuleLoader>
  )
})

export default AddCommentForm
