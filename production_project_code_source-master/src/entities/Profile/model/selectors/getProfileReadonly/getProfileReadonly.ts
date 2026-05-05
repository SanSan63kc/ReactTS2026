import { StateSchema } from "app/providers/StoreProvider";

export let getProfileReadonly = (state: StateSchema)=>state.profile?.readonly