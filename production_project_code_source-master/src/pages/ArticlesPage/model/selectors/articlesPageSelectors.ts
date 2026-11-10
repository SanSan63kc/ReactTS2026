import { StateSchema } from "app/providers/StoreProvider"
import { ArticleSortField, ArticleView } from "entities/Article"

export let getArticlesPageIsLoading = (state: StateSchema) =>
  state.articlesPage?.isLoading || false

export let getArticlesPageError = (state: StateSchema) =>
  state.articlesPage?.error || false

export let getArticlesPageView = (state: StateSchema) =>
  state.articlesPage?.view || ArticleView.SMALL

export let getArticlesPageNum = (state: StateSchema) =>
  state.articlesPage?.page || 1

export let getArticlesPageLimit = (state: StateSchema) =>
  state.articlesPage?.limit || 9

export let getArticlesPageHasMore = (state: StateSchema) =>
  state.articlesPage?.hasMore

export let getArticlesPageInited = (state: StateSchema) =>
  state.articlesPage?._inited


export let getArticlesPageOrder = (state: StateSchema) =>
  state.articlesPage?.order ?? "asc"

export let getArticlesPageSort = (state: StateSchema) =>
  state.articlesPage?.sort ?? ArticleSortField.CREATED

export let getArticlesPageSearch = (state: StateSchema) =>
  state.articlesPage?.search ?? ""
