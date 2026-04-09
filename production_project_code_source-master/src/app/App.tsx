import { Suspense} from "react"
import { Link, Route, Routes } from "react-router-dom"
import "./styles/index.scss"
import { useTheme } from "./providers/ThemeProviders"
import AboutPage from "pages/AboutPage/ui/AboutPage"
import MainPage from "pages/MainPage/ui/MainPage"
import { classNames } from "shared/lib/classNames/classNames"


const App = () => {
  let {theme, toggleTheme} = useTheme()

  return (
    <div className={classNames("app", {}, [theme])}>
      <button onClick={toggleTheme}>сменить тему</button>
      <Link to={"/"}>Главная</Link>
      <Link to={"/about"}>О сайте</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={"/about"} element={<AboutPage/>} />
          <Route path={"/"} element={<MainPage/>} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
