import { CombinedSliceReducer, EnhancedStore, Reducer, ReducersMapObject, UnknownAction } from "@reduxjs/toolkit"

import { CounterSchema } from "entities/Counter"
import { UserSchema } from "entities/User"
import { LoginSchema } from "features/AuthByUserName"

export interface StateSchema {
  counter: CounterSchema
  user: UserSchema
  loginForm?: LoginSchema
}

export type StateSchemaKey = keyof StateSchema

export interface ReduxStoreWithmanager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager
}

export interface ReducerManager{
  getReducerMap: ()=> ReducersMapObject<StateSchema>
  reduce: (state: StateSchema, action:UnknownAction)=>CombinedSliceReducer<StateSchema>
  add: (key: StateSchemaKey, reducer: Reducer) => void
  remove: (key: StateSchemaKey) => void
}