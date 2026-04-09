import { createContext } from "react"

export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

export interface ThemeContextProps {
  theme?: Theme
  setTheme?: (theme: Theme) => void
}

export let ThemeContext = createContext<ThemeContextProps>({})

export let LOCAL_STORAGE_THEME_KEY = "theme"
