import { StateSchema } from "app/providers/StoreProvider"

export let getArticleRecommendationsIsLoading = (state: StateSchema) => {
  return state.articleDetailsPage?.recommendations?.isLoading
}
export let getArticleRecommendationsError = (state: StateSchema) => {
  return state.articleDetailsPage?.recommendations?.error
}
