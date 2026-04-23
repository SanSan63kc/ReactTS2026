import { createContext } from "react"

export enum Theme {
  LIGHT = "app_light_theme",
  DARK = "app_dark_theme",
}

export interface ThemeContextProps {
  theme?: Theme
  setTheme?: (theme: Theme) => void
}

export let ThemeContext = createContext<ThemeContextProps>({})

export let LOCAL_STORAGE_THEME_KEY = "theme"
