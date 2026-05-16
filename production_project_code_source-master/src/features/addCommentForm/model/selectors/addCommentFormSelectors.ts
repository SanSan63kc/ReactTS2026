import { StateSchema } from "app/providers/StoreProvider";

export let getAddCommentFormText = (state: StateSchema)=>state.addCommentForm?.text
export let getAddCommentFormError = (state: StateSchema)=>state.addCommentForm?.error