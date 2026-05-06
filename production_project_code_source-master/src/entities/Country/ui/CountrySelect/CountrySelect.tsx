import { classNames } from "shared/lib/classNames/classNames"
import { Select } from "shared/ui/Select/Select"
import { useTranslation } from "react-i18next"
import { memo, useCallback } from "react"
import { Country } from "entities/Country/model/types/country"

interface CountrySelectProps {
  className?: string
  value?: Country
  onChange?: (value: Country) => void
  readonly?: boolean
}

let options = [
  { value: Country.Russia, content: Country.Russia },
  { value: Country.Armenia, content: Country.Armenia },
  { value: Country.Belarus, content: Country.Belarus },
  { value: Country.Kazakhstan, content: Country.Kazakhstan },
]

export const CountrySelect = memo((props: CountrySelectProps) => {
  let { className, value, onChange, readonly } = props
  let { t } = useTranslation()

  let onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Country)
    },
    [onChange],
  )

  return (
    <Select
      className={classNames("", {}, [className || ""])}
      label={t("Укажите страну")}
      options={options}
      value={value}
      onChange={onChangeHandler}
      readonly={readonly}
    />
  )
})
