import { StateSchema } from "app/providers/StoreProvider"

export let getLoginUsername = (state: StateSchema) => state?.loginForm?.username || ""