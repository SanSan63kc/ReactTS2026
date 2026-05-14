import { createEntityAdapter, createSlice, EntityState, PayloadAction } from "@reduxjs/toolkit"
import { StateSchema } from "app/providers/StoreProvider"
import { Comment } from "entities/Comment/model/types/comment"
import { ArticleDetailsCommentsSchema } from "../types/ArticleDetailsCommentsSchema"
import { fetchCommentsByArticleId } from "../services/fetchCommentsByArticleId/fetchCommentsByArticleId"

const commentsAdapter = createEntityAdapter<Comment>({
  //selectId: (comment: Comment) => comment.id, // так в курсе
})

export let getArticleComments = commentsAdapter.getSelectors<StateSchema>(
  (state) => state.articleDetailsComments || commentsAdapter.getInitialState(),
)

let articleDetailsCommentSlice = createSlice({
  name: "articleDetailsCommentSlice",
  initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
    isLoading: false,
    ids: [],
    entities: {},
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchArticleById
      .addCase(fetchCommentsByArticleId.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(
        fetchCommentsByArticleId.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.isLoading = false
          commentsAdapter.setAll(state, action.payload)
        },
      )
      .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export let { reducer: articleDetailsCommentReducer } =
  articleDetailsCommentSlice
