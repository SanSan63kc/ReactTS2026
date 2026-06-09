import { StateSchema } from "app/providers/StoreProvider"
import { ArticleView } from "entities/Article"

export let getArticlesPageIsLoading = (state: StateSchema) =>
  state.articlesPage?.isLoading || false

export let getArticlesPageError = (state: StateSchema) =>
  state.articlesPage?.error || false

export let getArticlesPageView = (state: StateSchema) =>
  state.articlesPage?.view || ArticleView.SMALL
