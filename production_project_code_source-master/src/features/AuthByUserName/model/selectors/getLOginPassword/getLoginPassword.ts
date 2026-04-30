import { StateSchema } from "app/providers/StoreProvider"

export let getLoginPassword = (state: StateSchema) => state?.loginForm?.password || ""