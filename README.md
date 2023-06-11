# Scrollen

A react hook utility to manage your scroll easily.

## Install

```sh
npm install scrollen
```

## Getting Started

To start using the scrollen you need import and call the `useScroller` hook

```js
import { useScroller } from 'scrollen'

const scroller = useScroller()
```

then you need to set the scroller element

```jsx
import { useScroller } from 'scrollen'

const scroller = useScroller()

<div ref={scroller.setScrollerElement}>
  ...
</div>
```

And that's it! Now you can start playing with your scroller.

## Documentation

First of all, a huge thanks to [@diegohaz](https://twitter.com/diegohaz) as this library uses the
Ariakit Component Stores API, so refer to the Ariakit [Component Stores Guide](https://ariakit.org/guide/component-stores) to learn the core
of the hook.

### Props

- initialScrollTop
  The initial `scrollTop` value to the scroll container.

- initialScrollLeft
  The initial `scrollLeft` value to the scroll container.

- startScrollAt
  Where the scroll container should start. You can pass `bottom` | `right`



### State

| State              | Description                                                         |
| ------------------ | ------------------------------------------------------------------- |
| `element`          | The scroller element.                                               |
| `scrollTop`        | The `scrollTop` value for the scroller element.                     |
| `scrollLeft`       | The `scrollLeft` value for the scroller element.                    |
| `scrollWidth`      | The `scrollWidth` value for the scroller element.                   |
| `scrollHeight`     | The `scrollHeight` value for the scroller element.                  |
| `scrollY`          | The progress of the vertical scroll. (between 0 and 1)              |
| `scrollX`          | The progress of the horizontal scroll. (between 0 and 1)            |
| `scrollLengthY`    | The length of the vertical scroll.                                  |
| `scrollLengthX`    | The length of the horizontal scroll.                                |
| `velocityY`        | The velocity of the vertical scroll.                                |
| `velocityX`        | The velocty of the horizontal scroll.                               |
| `scrollDirectionY` | The direction of the vertical scroll. (`static \| up \| down`)      |
| `scrollDirectionX` | The direction of the horizontal scroll. (`static \| left \| right`) |
| `isScrollingY`     | A boolean to check if the vertical scroll is scrolling.             |
| `isScrollingX`     | A boolean to check if the horizontal scroll is scrolling.           |
| `isAtTop`          | A boolean to check if the scroll reached the top.                   |
| `isAtBottom`       | A boolean to check if the scroll reached the bottom.                |
| `isAtLeft`         | A boolean to check if the scroll reached the left.                  |
| `isAtRight`        | A boolean to check if the scroll reached the right.                 |

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

- Ariakit - Thanks to [@diegohaz](https://twitter.com/diegohaz) for the Component Stores API that
  made it possible to create a performant hook
- react-virtuoso - Where I get ideas for the utilities
