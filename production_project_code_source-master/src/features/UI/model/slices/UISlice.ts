import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UISchema } from "../types/UISchema"

let initialState: UISchema = {
  scroll: {},
}

export let uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    setScrollPosition: (state, {payload}: PayloadAction<{path: string; position: number}>) => {
      state.scroll[payload.path] = payload.position
    }
  },
})

// Экспортируем экшены для использования в компонентах
export let { actions: uiActions } = uiSlice
export let { reducer: uiReducer } = uiSlice
