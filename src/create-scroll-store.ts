import { createStore } from '@ariakit/core/utils/store'

import type { Store } from '@ariakit/core/utils/store'

export function createScrollStore({ element }: { element?: HTMLElement | null }): ScrollStore {
  const initialState: ScrollStoreState = {
    element: element ?? null,
    scrollTop: 0,
    scrollLengthY: 0,
    scrollLengthX: 0,
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
      if (state.scrollTop > prev.scrollTop) {
        scroll.setState('scrollDirectionY', 'down')
      } else if (state.scrollTop < prev.scrollTop) {
        scroll.setState('scrollDirectionY', 'up')
      }
    },
    ['scrollTop'],
  )

  scroll.sync(
    (state, prev) => {
      if (state.scrollLeft > prev.scrollLeft) {
        scroll.setState('scrollDirectionX', 'right')
      } else if (state.scrollLeft < prev.scrollLeft) {
        scroll.setState('scrollDirectionX', 'left')
      }
    },
    ['scrollLeft'],
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
}

export interface ScrollStoreFunctions {
  setScrollerElement: (element: HTMLElement | null) => void
  setScroll: (x: number, y: number) => void
}

export type ScrollStore = ScrollStoreFunctions & Store<ScrollStoreState>
