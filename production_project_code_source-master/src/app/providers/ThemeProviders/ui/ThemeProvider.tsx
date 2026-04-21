import { FC, useMemo, useState } from "react"
import {
  LOCAL_STORAGE_THEME_KEY,
  Theme,
  ThemeContext,
} from "../lib/ThemeContext"

let defaultTheme =
  (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT

interface ThemeProviderProps {
  ininitalTheme?: Theme
}

let ThemeProvider: FC<ThemeProviderProps> = (props) => {
  let { ininitalTheme, children } = props
  let [theme, setTheme] = useState<Theme>(ininitalTheme || defaultTheme)

  let defaultProps = useMemo(
    () => ({
      theme: theme,
      setTheme: setTheme,
    }),
    [theme],
  )

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
