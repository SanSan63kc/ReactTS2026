import { createReduxStore } from "./config/store"
import { StoreProvider } from "./ui/StoreProvider"
import type { StateSchema, ThunkConfig } from "./config/StateSchema"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch"
export type { AppDispatch } from "./config/store"

export {
  StoreProvider,
  createReduxStore,
  StateSchema,
  useAppDispatch,
  ThunkConfig,
}
