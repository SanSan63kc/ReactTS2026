import { classNames } from "shared/lib/classNames/classNames"
import cls from "./Input.module.scss"
import { InputHTMLAttributes, memo, useState } from "react"

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
>

interface InputProps extends HTMLInputProps {
  className?: string
  value?: string
  onChange?: (value: string) => void
}

export const Input = memo((props: InputProps) => {
  let {
    className,
    value,
    onChange,
    type = "text",
    placeholder,
    ...otherProps
  } = props

  let [isFocused, setIsFocused] = useState(false)

  let [caretPosition, setisCaretPosition] = useState(0)

  let onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  let onBlur = () => {
    setIsFocused(false)
  }

  let onFocus = () => {
    setIsFocused(true)
  }

  return (
    <div className={classNames(cls.inputWrapper, {}, [className || ""])}>
      {placeholder && (
        <div className={cls.placeholder}>{`${placeholder}>`}</div>
      )}
      <div className={cls.caretWrapper}>
        <input
          type={type}
          value={value}
          onChange={onChangeHandler}
          className={cls.input}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {isFocused && <span className={cls.caret} />}
      </div>
    </div>
  )
})
