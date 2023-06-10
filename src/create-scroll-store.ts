import { createStore } from '@ariakit/core/utils/store'
import { velocityPerSecond } from './utils'

import type { Store } from '@ariakit/core/utils/store'

export function createScrollStore(): ScrollStore {
  let time = 0

  const initialState: ScrollStoreState = {
    element: null,
    scrollTop: 0,
    scrollLengthY: 0,
    scrollLengthX: 0,
    velocityY: 0,
    velocityX: 0,
    scrollLeft: 0,
    scrollWidth: 0,
    scrollHeight: 0,
    scrollX: 0,
    scrollY: 0,
    isAtTop: true,
    isAtBottom: false,
    isAtLeft: true,
    isAtRight: false,
    scrollDirectionY: 'static',
    scrollDirectionX: 'static',
    isScrollingY: false,
    isScrollingX: false,
  }

  const scroll = createStore(initialState)

  scroll.sync(
    (state) => {
      if (!state.element) return
      scroll.setState('scrollLengthY', state.element.scrollHeight - state.element.clientHeight)
    },
    ['element'],
  )

  scroll.sync(
    (state) => {
      if (!state.element) return
      scroll.setState('scrollLengthX', state.element.scrollWidth - state.element.clientWidth)
    },
    ['element'],
  )

  scroll.sync(
    (state, prev) => {
      const newTime = new Date().getTime()
      const elapsed = newTime - time
      const velocity =
        elapsed > 50 ? 0 : velocityPerSecond(state.scrollTop - prev.scrollTop, elapsed)
      time = newTime
      scroll.setState('velocityY', velocity)
    },
    ['scrollTop'],
  )

  scroll.sync(
    (state, prev) => {
      const newTime = new Date().getTime()
      const elapsed = newTime - time
      const velocity =
        elapsed > 50 ? 0 : velocityPerSecond(state.scrollLeft - prev.scrollLeft, elapsed)
      time = newTime
      scroll.setState('velocityX', velocity)
    },
    ['scrollLeft'],
  )

  scroll.sync(
    (state) => {
      if (state.isAtTop || state.isAtBottom) {
        scroll.setState('velocityY', 0)
      }
    },
    ['isAtTop', 'isAtBottom'],
  )

  scroll.sync(
    (state) => {
      if (state.isAtLeft || state.isAtRight) {
        scroll.setState('velocityX', 0)
      }
    },
    ['isAtLeft', 'isAtRight'],
  )

  scroll.sync(
    (state) => {
      scroll.setState('isScrollingY', state.velocityY !== 0)
      if (state.velocityY > 0) scroll.setState('scrollDirectionY', 'down')
      if (state.velocityY < 0) scroll.setState('scrollDirectionY', 'up')
      else scroll.setState('scrollDirectionY', 'static')
    },
    ['velocityY'],
  )

  scroll.sync(
    (state) => {
      scroll.setState('isScrollingX', state.velocityX !== 0)
      if (state.velocityX > 0) scroll.setState('scrollDirectionX', 'right')
      if (state.velocityX < 0) scroll.setState('scrollDirectionX', 'left')
      else scroll.setState('scrollDirectionX', 'static')
    },
    ['velocityX'],
  )

  return {
    ...scroll,
    setScrollerElement: (element) => {
      if (element) {
        scroll.setState('element', element)
        scroll.setState('scrollTop', element.scrollTop)
        scroll.setState('scrollLeft', element.scrollLeft)
        scroll.setState('scrollWidth', element.scrollWidth)
        scroll.setState('scrollHeight', element.scrollHeight)
      }
    },
    setScroll: (x, y) => {
      scroll.setState('scrollX', x)
      scroll.setState('scrollY', y)
    },
  }
}

export interface ScrollStoreState {
  element: HTMLElement | null
  scrollLengthY: number
  scrollLengthX: number
  velocityY: number
  velocityX: number
  scrollTop: number
  scrollLeft: number
  scrollWidth: number
  scrollHeight: number
  scrollX: number
  scrollY: number
  isAtTop: boolean
  isAtBottom: boolean
  isAtLeft: boolean
  isAtRight: boolean
  scrollDirectionY: 'static' | 'up' | 'down'
  scrollDirectionX: 'static' | 'left' | 'right'
  isScrollingY: boolean
  isScrollingX: boolean
}

export interface ScrollStoreFunctions {
  setScrollerElement: (element: HTMLElement | null) => void
  setScroll: (x: number, y: number) => void
}

export type ScrollStore = ScrollStoreFunctions & Store<ScrollStoreState>
