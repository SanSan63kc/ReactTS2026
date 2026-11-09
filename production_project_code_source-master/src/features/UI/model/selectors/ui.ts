import { createSelector } from "@reduxjs/toolkit"
import { StateSchema } from "app/providers/StoreProvider"

export let getUIScroll = (state: StateSchema) => state.ui.scroll
export let getUIScrollByPath = createSelector(
  getUIScroll,
  (state: StateSchema, path: string) => path,
  (scroll, path) => scroll[path] || 0,
)
/*  */