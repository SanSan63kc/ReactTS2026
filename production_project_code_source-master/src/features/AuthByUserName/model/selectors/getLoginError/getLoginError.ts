import { StateSchema } from "app/providers/StoreProvider"

export let getLoginError = (state: StateSchema) => state?.loginForm?.error