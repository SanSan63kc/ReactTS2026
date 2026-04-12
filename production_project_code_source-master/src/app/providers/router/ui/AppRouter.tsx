import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { routeConfig } from "shared/config/routerConfig/routeConfig"

let AppRouter = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {Object.values(routeConfig).map(({ element, path }) => (
            <Route
              key={path}
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <div className="page-wrapper">{element}</div>
                </Suspense>
              }
              path={path}
            />
          ))}
        </Routes>
      </Suspense>
    </div>
  )
}

export default AppRouter
