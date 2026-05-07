import { StateSchema } from "app/providers/StoreProvider";

export let getProfileValidateErrors = (state: StateSchema)=>state.profile?.validateError