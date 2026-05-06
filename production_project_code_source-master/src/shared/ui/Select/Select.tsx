import { classNames, Mods } from "shared/lib/classNames/classNames"
import cls from "./Select.module.scss"
import { ChangeEvent, memo, useMemo } from "react"

export interface SelectOption {
  value: string
  content: string
}

interface SelectProps {
  className?: string
  label?: string
  options?: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  readonly?: boolean
}

export const Select = memo((props: SelectProps) => {
  let { className, label, options, onChange, value, readonly } = props
  let mods: Mods = {}

  let onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value)
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
})
