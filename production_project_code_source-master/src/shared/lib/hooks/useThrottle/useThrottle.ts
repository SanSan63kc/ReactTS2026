import { useCallback, useRef } from "react"

export function useThrottle(callBack: (...args: any[]) => void, delay: number) {
  let throttleRef = useRef(false)

  return useCallback(
    (...args: any[]) => {
      if (!throttleRef.current) {
        callBack(...args)
        throttleRef.current = true

        setTimeout(() => {
          throttleRef.current = false
        }, delay)
      }
    },
    [callBack, delay],
  )
}
