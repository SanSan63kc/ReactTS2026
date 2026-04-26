import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { LoginSchema } from "../types/loginSchema"

let initialState: LoginSchema = {
  isLoading: false,
  username: "",
  password: "",
}

export const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload
    },
  },
})

// Экспортируем экшены для использования в компонентах
export const { actions: loginActions } = loginSlice
export const { reducer: loginReducer } = loginSlice
