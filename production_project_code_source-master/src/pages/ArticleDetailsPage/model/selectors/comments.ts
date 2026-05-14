import { StateSchema } from "app/providers/StoreProvider";

export let getArticleCommentsIsLoading=(state: StateSchema)=>state.articleDetailsComments?.isLoading
export let getArticleCommentsError=(state: StateSchema)=>state.articleDetailsComments?.error