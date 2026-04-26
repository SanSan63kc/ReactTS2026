import { StateSchema } from "app/providers/StoreProvider"

export let getLoginState = (state: StateSchema) => state?.loginForm
