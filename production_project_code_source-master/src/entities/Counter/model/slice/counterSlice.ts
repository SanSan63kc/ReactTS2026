import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CounterSchema } from "../types/counterSchema"

let initialState: CounterSchema = {
  value: 0,
}

export const counterSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    // Пример экшена с данными (payload)
  },
})

// Экспортируем экшены для использования в компонентах
export const { actions: counterActions } = counterSlice
export const { reducer: counterReducer } = counterSlice
