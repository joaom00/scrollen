import React from 'react'
import { useEvent, useSafeLayoutEffect } from '@ariakit/react-core/utils/hooks'
import { useStore } from '@ariakit/react-core/utils/store'
import { createScrollStore } from './create-scroll-store'
import { round } from './utils'

export function useScroller<TElement extends ScrollElement = null>(
  options: ScrollOptions<ScrollElement> = {},
) {
  const {
    element: elementProp = globalThis?.document,
    initialScrollTop,
    initialScrollLeft,
    startScrollAt = 'bottom',
  } = options
  const store = useStore(() =>
    createScrollStore({
      element: elementProp instanceof Document ? elementProp.documentElement : elementProp,
    }),
  )
  const element = store.useState('element')

  const onScroll = useEvent(() => {
    if (!element) return
    const { scrollLeft, scrollTop, clientWidth, clientHeight, scrollWidth, scrollHeight } = element
    const x = round(scrollLeft / (scrollWidth - clientWidth))
    const y = round(scrollTop / (scrollHeight - clientHeight))

    store.setScroll(x, y)
    store.setState('scrollTop', scrollTop)
    store.setState('scrollLeft', scrollLeft)
    store.setState('isAtTop', y === 0)
    store.setState('isAtBottom', y === 1)
    store.setState('isAtLeft', x === 0)
    store.setState('isAtRight', x === 1)
  })

  const scrollToTop = useEvent((behavior: ScrollBehavior = 'auto') => {
    if (!element) return
    element.scrollTo({
      top: 0,
      behavior,
    })
  })
  const scrollToLeft = useEvent((behavior: ScrollBehavior = 'auto') => {
    if (!element) return
    element.scrollTo({
      left: 0,
      behavior,
    })
  })
  const scrollToBottom = useEvent((behavior: ScrollBehavior = 'auto') => {
    if (!element) return
    element.scrollTo({
      top: element.scrollHeight,
      behavior,
    })
  })
  const scrollToRight = useEvent((behavior: ScrollBehavior = 'auto') => {
    if (!element) return
    element.scrollTo({
      left: element.scrollWidth,
      behavior,
    })
  })

  useSafeLayoutEffect(() => {
    if (!element) return
    if (initialScrollTop) {
      const value =
        typeof initialScrollTop === 'function'
          ? initialScrollTop(element as ScrollElement)
          : initialScrollTop
      element.scrollTop = value
    }
    if (initialScrollLeft) {
      const value =
        typeof initialScrollLeft === 'function'
          ? initialScrollLeft(element as ScrollElement)
          : initialScrollLeft
      element.scrollLeft = value
    }
    if (startScrollAt === 'bottom') {
      element.scrollTop = element.scrollHeight
    } else {
      element.scrollLeft = element.scrollWidth
    }
  }, [element, initialScrollTop, initialScrollLeft, startScrollAt])

  React.useEffect(() => {
    if (!element) return
    const target = element === document.documentElement ? globalThis?.document : element
    target.addEventListener('scroll', onScroll, { passive: true })
    return () => target.removeEventListener('scroll', onScroll)
  }, [element, onScroll])

  return {
    ...store,
    scrollToTop,
    scrollToLeft,
    scrollToBottom,
    scrollToRight,
    ...createUseOnScrollBottomAndTop<TElement>(element as TElement),
  }
}

type UseOnScrollBottomTopHandler<TElement extends ScrollElement = null> = (
  event: Event,
  element: TElement,
) => void

function createUseOnScrollBottomAndTop<T extends ScrollElement = null>(element: T) {
  function useOnScrollBottom(callback: UseOnScrollBottomTopHandler<T>) {
    const onScrollBottom = useEvent(callback)

    React.useEffect(() => {
      if (!element) return
      const handleScroll = (event: Event) => {
        if (element.scrollTop + element.clientHeight === element.scrollHeight) {
          onScrollBottom(event, element)
        }
      }

      element.addEventListener('scroll', handleScroll, { passive: true })
      return () => {
        element.removeEventListener('scroll', handleScroll)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [element, onScrollBottom])
  }

  function useOnScrollTop(callback: UseOnScrollBottomTopHandler<T>) {
    const onScrollTop = useEvent(callback)

    React.useEffect(() => {
      if (!element) return
      const handleScroll = (event: Event) => {
        if (element.scrollTop === 0) {
          onScrollTop(event, element)
        }
      }

      element.addEventListener('scroll', handleScroll, { passive: true })
      return () => {
        element.removeEventListener('scroll', handleScroll)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [element, onScrollTop])
  }

  return { useOnScrollBottom, useOnScrollTop }
}

type ScrollElement<TElement = HTMLElement> = TElement | null

export interface ScrollOptions<ScrollElement = null> {
  element?: ScrollElement | Document
  initialScrollTop?: number | ((element: ScrollElement) => number)
  initialScrollLeft?: number | ((element: ScrollElement) => number)
  startScrollAt?: 'bottom' | 'right'
}
