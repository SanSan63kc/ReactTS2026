/* import { StoreProvider } from "./ui/StoreProvider"
import { createReduxStore, AppDispatch } from "./config/store"
import type { StateSchema, ThunkConfig } from "./config/StateSchema"

export { StoreProvider, createReduxStore }

export type { StateSchema, ThunkConfig, AppDispatch }
 */

import { StoreProvider } from "./ui/StoreProvider"
import { createReduxStore } from "./config/store"
import type { AppDispatch } from "./config/store"
import type { StateSchema, ThunkConfig } from "./config/StateSchema"
// 1. Импортируйте хук (проверьте путь, где он у вас лежит физически)
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch" 

export { 
  StoreProvider, 
  createReduxStore,
  useAppDispatch // 2. Добавьте его сюда
}

export type { StateSchema, ThunkConfig, AppDispatch }