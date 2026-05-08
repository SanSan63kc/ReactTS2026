import { memo, Suspense, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { Route, Routes } from "react-router-dom"
import {
  AppRoutesProps,
  routeConfig,
} from "shared/config/routerConfig/routeConfig"
import { RequireAuth } from "./RequireAuth"

let AppRouter = () => {
  let { t } = useTranslation()

  let renderWithWrapper = useCallback((route: AppRoutesProps) => {
    let element = (
      <Suspense fallback={<div>{t("Загрузка")}</div>}>
        <div className="page-wrapper">{route.element}</div>
      </Suspense>
    )

    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.authOnly ? <RequireAuth>{element}</RequireAuth> : element
        }
      />
    )
  }, [])

  return (
    <Suspense fallback={<div>{t("Загрузка")}</div>}>
      <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
    </Suspense>
  )
}

export default memo(AppRouter)
