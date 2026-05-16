import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AddCommentFormSchema } from "../types/addCommentForm"

let initialState: AddCommentFormSchema = {
  text: "",
}

export const addCommentSlice = createSlice({
  name: "addCommentForm",
  initialState: initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload
    },
  },
  /*  extraReducers: (builder) => {
        builder
            .addCase(loginByUsername.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(loginByUsername.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(loginByUsername.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }, */
})

// Экспортируем экшены для использования в компонентах
export const { actions: addCommentActions } = addCommentSlice
export const { reducer: addCommentReducer } = addCommentSlice
