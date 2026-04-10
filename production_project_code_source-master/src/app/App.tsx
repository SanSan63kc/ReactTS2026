import { Link } from "react-router-dom"
import "./styles/index.scss"
import { useTheme } from "./providers/ThemeProviders"
import { classNames } from "shared/lib/classNames/classNames"
import { AppRouter } from "./providers/router"

const App = () => {
  let { theme, toggleTheme } = useTheme()

  return (
    <div className={classNames("app", {}, [theme])}>
      <button onClick={toggleTheme}>сменить тему</button>
      <Link to={"/"}>Главная</Link>
      <Link to={"/about"}>О сайте</Link>
      <AppRouter />
    </div>
  )
}

export default App
