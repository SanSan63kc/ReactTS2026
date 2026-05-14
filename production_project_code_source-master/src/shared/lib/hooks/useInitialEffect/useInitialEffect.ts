import { useEffect } from "react"

export let useInitialEffect = (callback: ()=>void) => {
  useEffect(() => {
      callback()
    }, [])
}
