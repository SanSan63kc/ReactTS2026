import { classNames } from "shared/lib/classNames/classNames"
import cls from "./Input.module.scss"
import { InputHTMLAttributes, memo, useEffect, useRef, useState } from "react"

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
>

interface InputProps extends HTMLInputProps {
  className?: string
  value?: string
  onChange?: (value: string) => void
  autoFocus?: boolean
}

export const Input = memo((props: InputProps) => {
  let {
    className,
    value,
    onChange,
    type = "text",
    placeholder,
    autoFocus,
    ...otherProps
  } = props

  let [isFocused, setIsFocused] = useState(false)

  let [caretPosition, setCaretPosition] = useState(0)

  let ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (autoFocus) {
      setIsFocused(true)
      ref.current?.focus()
    }
  }, [autoFocus])

  let onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
    setCaretPosition(e.target.value.length)
  }

  let onBlur = () => {
    setIsFocused(false)
  }

  let onFocus = () => {
    setIsFocused(true)
  }

  let onSelect = (e: any) => {
    setCaretPosition(e?.target?.selectionStart || 0)
  }

  return (
    <div className={classNames(cls.inputWrapper, {}, [className || ""])}>
      {placeholder && (
        <div className={cls.placeholder}>{`${placeholder}>`}</div>
      )}
      <div className={cls.caretWrapper}>
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={onChangeHandler}
          className={cls.input}
          onFocus={onFocus}
          onBlur={onBlur}
          onSelect={onSelect}
          {...otherProps}
        />
        {isFocused && (
          <span
            className={cls.caret}
            style={{ left: `${caretPosition * 8}px` }}
          />
        )}
      </div>
    </div>
  )
})
