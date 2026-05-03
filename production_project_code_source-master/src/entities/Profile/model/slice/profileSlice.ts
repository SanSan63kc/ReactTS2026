import { createSlice } from "@reduxjs/toolkit"
import { ProfileSchema } from "../types/profile"

let initialState: ProfileSchema = {
  readonly: true,
  isLoading: false,
  error: undefined,
  data: undefined,
}

export const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {},
})

// Экспортируем экшены для использования в компонентах
export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice
