import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ArticleDetailsSchema } from "../types/articleDetailsSchema"
import { fetchArticleById } from "../services/fetchArticleById/fetchArticleById"
import { Article } from "../types/article"

let initialState: ArticleDetailsSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
}

export const articleDetailsSlice = createSlice({
  name: "articleDetails",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchArticleById
      .addCase(fetchArticleById.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(
        fetchArticleById.fulfilled,
        (state, action: PayloadAction<Article>) => {
          state.isLoading = false
          state.data = action.payload
        },
      )
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

// Экспортируем экшены для использования в компонентах
export const { actions: articleDetailsActions } = articleDetailsSlice
export const { reducer: articleDetailsReducer } = articleDetailsSlice
