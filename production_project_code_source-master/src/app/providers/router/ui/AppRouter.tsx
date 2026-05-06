import { getUserAuthData } from "entities/User/model/selectors/getUserAuthData/getUserAuthData"
import { memo, Suspense, useMemo } from "react"
import { useSelector } from "react-redux"
import { Route, Routes } from "react-router-dom"
import { routeConfig } from "shared/config/routerConfig/routeConfig"

let AppRouter = () => {

  let isAuth =  useSelector(getUserAuthData)

  let routes = useMemo(()=>{
    return Object.values(routeConfig).filter(route=>{
      if(route.authOnly && !isAuth){
        return false
      }

      return true
    })
  }, [isAuth])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map(({ element, path }) => (
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
  )
}

export default memo(AppRouter)
