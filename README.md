# Scrollen

A react hook utility to manage your scroll easily.

## Install

```sh
npm install scrollen
```

## Getting Started

Import and call `useScroller` hook

```ts
const scroller = useScroller()
```

then you need to set the scroller element

```tsx
const scroller = useScroller()

<div ref={scroller.setScrollerElement}>
  ...
</div>
```

And that is! Now you can use the utilities functions that are provided by the hook!

## Documentation

First of all, the hook uses the Component Store API from Ariakit, refer to the [Component Stores Guide](https://ariakit.org/guide/component-stores) to learn how you can use.

### Props

- initialScrollTop
  The initial `scrollTop` value to the scroll container.

- initialScrollLeft
  The initial `scrollLeft` value to the scroll container.

- startScrollAt
  Where the scroll container should start. You can pass `bottom` | `right`

### State

- element
  The scroller element.
- scrollTop
  The `scrollTop` value for the scroller element.
- scrollLeft
  The `scrollLeft` value for the scroller element.
- scrollWidth
  The `scrollWidth` value for the scroller element.
- scrollHeight
  The `scrollHeight` value for the scroller element.
- scrollX
  The progress of the horizontal scroll (between 0 and 1).
- scrollY
  The progress of the vertical scroll (between 0 and 1).
- isAtTop
  A boolean to know if the scroll is at top.
- isAtBottom
  A boolean to know if the scroll is at bottom.

### Functions

- setScrollerElement
- setScroll
- scrollToTop
- scrollToLeft
- scrollToBottom
- scrollToRight
- useOnScrollTop
- useOnScrollBottom

## Acknowledgements

- Ariakit - Huge thanks to @diegohaz for the Component Store API where I can make a performant hook
- react-virtuoso - Where I get ideas for the utilities
