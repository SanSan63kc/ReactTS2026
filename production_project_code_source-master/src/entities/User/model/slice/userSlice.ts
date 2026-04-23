import { createSlice} from "@reduxjs/toolkit"
import { UserSchema } from "../types/user"

let initialState: UserSchema = {
  
}

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
})

// Экспортируем экшены для использования в компонентах
export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice
