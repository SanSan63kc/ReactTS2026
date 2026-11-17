import { StateSchema } from "app/providers/StoreProvider"

export let getArticleCommentsIsLoading = (state: StateSchema) => {
  return state.articleDetailsPage?.comments?.isLoading
}
export let getArticleCommentsError = (state: StateSchema) => {
  return state.articleDetailsPage?.comments?.error
}
