import { useContext } from "react"
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "./ThemeContext"

interface UseThemeResult {
  toggleTheme: () => void
  theme: Theme
}

export function useTheme(): UseThemeResult {
  let { theme, setTheme } = useContext(ThemeContext)

  let toggleTheme = () => {
    let newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK
    setTheme?.(newTheme)
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
  }

  return {theme: theme || Theme.LIGHT , toggleTheme}
}
