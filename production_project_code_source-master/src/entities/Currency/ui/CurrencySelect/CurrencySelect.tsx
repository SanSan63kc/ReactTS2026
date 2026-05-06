import { classNames } from "shared/lib/classNames/classNames"
import { Select } from "shared/ui/Select/Select"
import { Currency } from "entities/Currency/model/types/currency"
import { useTranslation } from "react-i18next"
import { memo, useCallback } from "react"

interface CurrencySelectProps {
  className?: string
  value?: Currency
  onChange?: (value: Currency) => void
  readonly?: boolean
}

let options = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD },
]

export const CurrencySelect = memo((props: CurrencySelectProps) => {
  let { className, value, onChange, readonly } = props
  let { t } = useTranslation()

  let onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Currency)
  }, [onChange])

  return (
    <Select
      className={classNames("", {}, [className || ""])}
      label={t("Укажите валюту")}
      options={options}
      value={value}
      onChange={onChangeHandler}
      readonly={readonly}
    />
  )
})
