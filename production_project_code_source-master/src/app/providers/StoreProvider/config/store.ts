import { configureStore, ReducersMapObject } from "@reduxjs/toolkit"
import { StateSchema } from "./StateSchema"
import { counterReducer } from "entities/Counter"
import { userReducer } from "entities/User"
import { createReducerManager } from "./reducerManager"
//import { loginReducer } from "features/AuthByUserName/model/slice/loginSlice"

export function createReduxStore(initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    counter: counterReducer,
    user: userReducer/* ,
    loginForm: loginReducer, */
  }

  let reducerManager = createReducerManager(rootReducers)

  let store = configureStore({
    reducer: reducerManager.reduce,
    devTools: __IS_DEV__,
    preloadedState: initialState,
  })

  // @ts-ignore
  store.reducerManager = reducerManager

  return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"]
