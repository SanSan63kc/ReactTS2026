import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User, UserSchema } from "../types/user"
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage"

let initialState: UserSchema = {}

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload
    },
    initAuthData: (state) => {
      let user = localStorage.getItem(USER_LOCALSTORAGE_KEY)
      if (user) {
        state.authData = JSON.parse(user)
      }
    },
    logout: (state) => {
      state.authData = undefined
      localStorage.removeItem(USER_LOCALSTORAGE_KEY)
    },
  },
})

// Экспортируем экшены для использования в компонентах
export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice
