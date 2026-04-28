import "./styles/index.scss"
import { useTheme } from "./providers/ThemeProviders"
import { classNames } from "shared/lib/classNames/classNames"
import { AppRouter } from "./providers/router"
import { Navbar } from "widgets/Navbar"
import { Sidebar } from "widgets/Sidebar"
import { Suspense, useEffect, useState } from "react"
import { Modal } from "shared/ui/Modal/Modal"
import { useDispatch } from "react-redux"
import { userActions } from "entities/User"

const App = () => {
  let { theme, toggleTheme } = useTheme()
  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(userActions.initAuthData())
  }, [dispatch])

  /* let [isOpen, setIsOpen] = useState(false) */

  return (
    <div className={classNames("app", {}, [theme])}>
      <Suspense fallback="">
        <Navbar />
        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  )
}

export default App
