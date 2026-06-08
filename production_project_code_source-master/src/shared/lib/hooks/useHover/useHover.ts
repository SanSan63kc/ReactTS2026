import { useCallback, useMemo, useState } from "react"

interface UseHoverBind {
  onMouseEnter: () => void
  onMouseLeave: () => void
}

type UseHoverResult = [boolean, UseHoverBind]

export let useHover = (): UseHoverResult => {
  let [isHover, setIsHover] = useState(false)

  let onMouseEnter = useCallback(() => {
    setIsHover(true)
  }, [])

  let onMouseLeave = useCallback(() => {
    setIsHover(false)
  }, [])

  return useMemo(
    () => [isHover, { onMouseEnter, onMouseLeave }],
    [isHover, onMouseEnter, onMouseLeave],
  )
}
