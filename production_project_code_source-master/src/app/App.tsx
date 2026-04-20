import "./styles/index.scss"
import { useTheme } from "./providers/ThemeProviders"
import { classNames } from "shared/lib/classNames/classNames"
import { AppRouter } from "./providers/router"
import { Navbar } from "widgets/Navbar"
import { Sidebar } from "widgets/Sidebar"
import { Suspense, useState } from "react"
import { Modal } from "shared/ui/Modal/Modal"

const App = () => {
  let { theme, toggleTheme } = useTheme()

  let [isOpen, setIsOpen] = useState(false)

  return (
    <div className={classNames("app", {}, [theme])}>
      <Suspense fallback="">
        <Navbar />
        <button onClick={()=>setIsOpen(true)}>toggle</button>
        <Modal isOpen={isOpen} onClose={()=>setIsOpen(false)}/>
        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  )
}

export default App
