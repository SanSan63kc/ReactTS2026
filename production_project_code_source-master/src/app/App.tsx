import { Link } from "react-router-dom"
import "./styles/index.scss"
import { useTheme } from "./providers/ThemeProviders"
import { classNames } from "shared/lib/classNames/classNames"
import { AppRouter } from "./providers/router"
import { Navbar } from "widgets/Navbar"

const App = () => {
  let { theme, toggleTheme } = useTheme()

  return (
    <div className={classNames("app", {}, [theme])}>
      <Navbar/>
      <button onClick={toggleTheme}>сменить тему</button>
      <AppRouter />
    </div>
  )
}

export default App
