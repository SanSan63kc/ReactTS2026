import { classNames, Mods } from "shared/lib/classNames/classNames"
import cls from "./Select.module.scss"
import { ChangeEvent, memo, useMemo } from "react"

export interface SelectOption<T extends string> {
  value: T
  content: string
}

interface SelectProps<T extends string> {
  className?: string
  label?: string
  options?: SelectOption<T>[]
  value?: T
  onChange?: (value: T) => void
  readonly?: boolean
}

export const Select = <T extends string>(props: SelectProps<T>) => {
  let { className, label, options, onChange, value, readonly } = props
  let mods: Mods = {}

  let onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value as T)
    }
  }

  let optionsList = useMemo(() => {
    return options?.map((opt) => (
      <option className={cls.option} value={opt.value} key={opt.value}>
        {opt.content}
      </option>
    ))
  }, [options])

  return (
    <div className={classNames(cls.wrapper, mods, [className || ""])}>
      {label && <span className={cls.label}>{label + ">"}</span>}
      <select
        className={cls.select}
        name=""
        id=""
        value={value}
        onChange={onChangeHandler}
        disabled={readonly}
      >
        {optionsList}
      </select>
    </div>
  )
}
