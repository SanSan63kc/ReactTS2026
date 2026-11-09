import { memo, MutableRefObject, ReactNode, UIEvent, useRef } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./Page.module.scss"
import { useInfiniteScroll } from "shared/lib/hooks/useInfiniteScroll/useInfiniteScroll"
import { StateSchema, useAppDispatch } from "app/providers/StoreProvider"
import { getUIScrollByPath, uiActions } from "features/UI"
import { useLocation } from "react-router-dom"
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect"
import { useSelector } from "react-redux"
import { useThrottle } from "shared/lib/hooks/useThrottle/useThrottle"

interface PageProps {
  className?: string
  children: ReactNode
  onScrollEnd?: () => void
}

export const Page = memo((props: PageProps) => {
  const { className, children, onScrollEnd } = props
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>
  let dispatch = useAppDispatch()
  let { pathname } = useLocation()
  let scrollPosition = useSelector((state: StateSchema) =>
    getUIScrollByPath(state, pathname),
  )

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
  })

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition
  })

  let onSCroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(
      uiActions.setScrollPosition({
        position: e.currentTarget.scrollTop,
        path: pathname,
      }),
    )
  }, 500)

  return (
    <section
      ref={wrapperRef}
      className={classNames(cls.page, {}, [className])}
      onScroll={onSCroll}
    >
      {children}
      <div ref={triggerRef} className={cls.trigger} />
    </section>
  )
})
