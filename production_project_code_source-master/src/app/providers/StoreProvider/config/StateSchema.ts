import {
  EnhancedStore,
  Reducer,
  ReducersMapObject,
  UnknownAction,
} from "@reduxjs/toolkit"
import { AxiosInstance } from "axios"
import { ArticleDetailsSchema } from "entities/Article"
import { CounterSchema } from "entities/Counter"
import { ProfileSchema } from "entities/Profile"
import { UserSchema } from "entities/User"
import { AddCommentFormSchema } from "features/addCommentForm"
import { LoginSchema } from "features/AuthByUserName"
import { ArticleDetailsCommentsSchema } from "pages/ArticleDetailsPage"
import { ArticlesPageSchema } from "pages/ArticlesPage"
import { NavigateOptions, To } from "react-router-dom"

export interface StateSchema {
  counter: CounterSchema
  user: UserSchema
  //async
  loginForm?: LoginSchema
  profile?: ProfileSchema
  articleDetails?: ArticleDetailsSchema
  articleDetailsComments?: ArticleDetailsCommentsSchema
  addCommentForm?: AddCommentFormSchema
  articlesPage?: ArticlesPageSchema
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

export interface ThunkExtraArg {
  api: AxiosInstance
  navigate?: (to: To, options?: NavigateOptions) => void
}

export interface ThunkConfig<T> {
  rejectValue: T
  extra: ThunkExtraArg
  state: StateSchema // <--- ОБЯЗАТЕЛЬНО добавьте эту строку
  //navigate?: (to: To, options?: NavigateOptions) => void
}
