import { StateSchema } from "app/providers/StoreProvider"

export let getLoginIsLoading = (state: StateSchema) => state?.loginForm?.isLoading || false