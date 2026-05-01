import { Reducer } from "@reduxjs/toolkit"
import {
  ReduxStoreWithmanager,
  StateSchemaKey,
} from "app/providers/StoreProvider/config/StateSchema"
import { FC, ReactNode, useEffect } from "react"
import { useDispatch, useStore } from "react-redux"

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer
}

type ReducersListEntry = [StateSchemaKey, Reducer]

interface DynamicModuleLoaderProps {
  children?: ReactNode
  reducers: ReducersList
  removeAfterUnmount?: boolean
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {

  let dispatch = useDispatch()
  let { children, reducers, removeAfterUnmount } = props
  let store = useStore() as ReduxStoreWithmanager

  useEffect(() => {
   (Object.entries(reducers) as ReducersListEntry[]).forEach(([name, reducer]: ReducersListEntry) => {
      store.reducerManager.add(name, reducer)
       dispatch({ type: `@INIT ${name} reducer` });
    })

    return () => {
    if (removeAfterUnmount) {
        (Object.entries(reducers) as ReducersListEntry[]).forEach(([name]) => {
            store.reducerManager.remove(name);
            dispatch({ type: `@DESTROY ${name} reducer` });
        });
    }
};
  }, [])

  return <>{children}</>
}
