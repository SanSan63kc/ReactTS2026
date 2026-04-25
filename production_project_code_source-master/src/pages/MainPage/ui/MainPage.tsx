import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Input } from "shared/ui/Input/Input"

const MainPage = () => {
  let { t } = useTranslation()
  let [value, setValue] = useState("")
  let onChange = (val: string) => {
    setValue(val)
  }
  return (
    <div>
      {t("Главная страница")}
      <Input onChange={onChange} value={value} placeholder={"Введите текст"}/>
    </div>
  )
}

export default MainPage
