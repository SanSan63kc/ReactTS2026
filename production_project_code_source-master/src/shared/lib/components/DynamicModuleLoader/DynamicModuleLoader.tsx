import { Reducer } from "@reduxjs/toolkit"
import {
  ReduxStoreWithmanager,
  StateSchemaKey,
} from "app/providers/StoreProvider/config/StateSchema"
import { FC, useEffect } from "react"
import { useStore } from "react-redux"

interface DynamicModuleLoaderProps {
  key: StateSchemaKey
  reducer: Reducer
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
  let { children, name, reducer } = props
  let store = useStore() as ReduxStoreWithmanager

  useEffect(() => {
    store.reducerManager.add(name, reducer)

    return () => {
      store.reducerManager.remove(name)
    }
  }, [])

  return <>{children}</>
}
