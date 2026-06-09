import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { StateSchema } from "app/providers/StoreProvider"
import { Article, ArticleView } from "entities/Article"
import { ArticlesPageSchema } from "../types/articlesPageSchema"
import { PayloadAction } from "@reduxjs/toolkit"
import { fetchArticlesList } from "../services/fetchArticlesList/fetchArticlesList"
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from "shared/const/localstorage"

const articlesAdapter = createEntityAdapter<Article>({
  //selectId: (article) => article.id, // так в курсе
})

export let getArticles = articlesAdapter.getSelectors<StateSchema>(
  (state) => state.articlesPage || articlesAdapter.getInitialState(),
)

let articlesPageSlice = createSlice({
  name: "articlesPageSlice",
  initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
    isLoading: false,
    ids: [],
    entities: {},
    view: ArticleView.SMALL,
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload
      localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload)
    },
    initState: (state) => {
      state.view = localStorage.getItem(
        ARTICLES_VIEW_LOCALSTORAGE_KEY,
      ) as ArticleView
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchArticleById
      .addCase(fetchArticlesList.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(
        fetchArticlesList.fulfilled,
        (state, action: PayloadAction<Article[]>) => {
          state.isLoading = false
          articlesAdapter.setAll(state, action.payload)
        },
      )
      .addCase(fetchArticlesList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export let { reducer: articlesPageReducer, actions: articlesPageActions } =
  articlesPageSlice
