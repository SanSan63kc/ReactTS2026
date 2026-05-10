import { StateSchema } from "app/providers/StoreProvider";

export let getArticleDetailsData = (state: StateSchema) => state.articleDetails?.data
export let getArticleDetailsIsLoading = (state: StateSchema) => state.articleDetails?.isLoading
export let getArticleDetailsError = (state: StateSchema) => state.articleDetails?.error