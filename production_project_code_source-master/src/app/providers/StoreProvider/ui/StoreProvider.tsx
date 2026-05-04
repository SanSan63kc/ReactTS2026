import { ReactNode } from "react"
import { Provider } from "react-redux"
import { createReduxStore } from "../config/store"
import { StateSchema } from "../config/StateSchema"
import { useNavigate } from "react-router-dom"

interface StoreProviderProps {
  children?: ReactNode
  initialState?: StateSchema
}



export let StoreProvider = (props: StoreProviderProps) => {

  let navigate = useNavigate()
  let { children, initialState } = props
  let store = createReduxStore(initialState , navigate)

  return <Provider store={store}>{children}</Provider>
}
