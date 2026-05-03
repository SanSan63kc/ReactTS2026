import {
  EnhancedStore,
  Reducer,
  ReducersMapObject,
  UnknownAction,
} from "@reduxjs/toolkit"
import { CounterSchema } from "entities/Counter"
import { ProfileSchema } from "entities/Profile"
import { UserSchema } from "entities/User"
import { LoginSchema } from "features/AuthByUserName"

export interface StateSchema {
  counter: CounterSchema
  user: UserSchema
  //async
  loginForm?: LoginSchema
  profile?: ProfileSchema
}

export type StateSchemaKey = keyof StateSchema

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  // Исправлено: state может быть undefined
  reduce: (state: StateSchema | undefined, action: UnknownAction) => StateSchema
  add: (key: StateSchemaKey, reducer: Reducer) => void
  remove: (key: StateSchemaKey) => void
}

export interface ReduxStoreWithmanager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager
}
