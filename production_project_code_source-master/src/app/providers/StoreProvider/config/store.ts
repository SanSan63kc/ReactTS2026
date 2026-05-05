import { configureStore, ReducersMapObject } from "@reduxjs/toolkit"
import { StateSchema, ThunkExtraArg } from "./StateSchema"
import { counterReducer } from "entities/Counter"
import { userReducer } from "entities/User"
import { createReducerManager } from "./reducerManager"
import { $api } from "shared/api/api"
import { NavigateOptions, To } from "react-router-dom"

export function createReduxStore(
  initialState?: StateSchema,
  navigate?: (to: To, options?: NavigateOptions) => void,
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    counter: counterReducer,
    user: userReducer,
  }

  let reducerManager = createReducerManager(rootReducers)

  let extraArg: ThunkExtraArg = { api: $api, navigate }

  let store = configureStore({
    reducer: reducerManager.reduce,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg,
        },
      }),
  })

  // @ts-ignore
  store.reducerManager = reducerManager

  return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"]
