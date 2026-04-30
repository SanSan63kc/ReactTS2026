import { Reducer } from "@reduxjs/toolkit"
import {
  ReduxStoreWithmanager,
  StateSchemaKey,
} from "app/providers/StoreProvider/config/StateSchema"
import { FC, useEffect } from "react"
import { useStore } from "react-redux"

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer
}

type ReducersListEntry = [StateSchemaKey, Reducer]

interface DynamicModuleLoaderProps {
  reducers: ReducersList
  removeAfterUnmount?: boolean
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
  let { children, reducers, removeAfterUnmount } = props
  let store = useStore() as ReduxStoreWithmanager

  useEffect(() => {
    Object.entries(reducers).forEach(([name, reducer]: ReducersListEntry) => {
      store.reducerManager.add(name, reducer)
    })

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(
          ([name, reducer]: ReducersListEntry) => {
            store.reducerManager.remove(name)
          },
        )
      }
    }
  }, [])

  return <>{children}</>
}
