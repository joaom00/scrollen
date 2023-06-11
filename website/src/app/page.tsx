'use client'
import React from 'react'
import ReactDOM from 'react-dom'
import { faker } from '@faker-js/faker'
import { useScroller } from 'scrollen'
import { motion, AnimatePresence } from 'framer-motion'

const initialMessages = Array.from({ length: 50 }).map(() => ({
  username: faker.internet.userName(),
  content: faker.lorem.sentence(),
}))

const timeoutMessages = [600, 800, 1000, 1200, 1400, 1600, 1800, 2000]

export default function Home() {
  const [messages, setMessages] = React.useState(initialMessages)
  const [newMessages, setNewMessages] = React.useState<typeof initialMessages>([])
  const scroller = useScroller<HTMLDivElement>({
    startScrollAt: 'bottom',
  })

  const isAtBottom = scroller.useState('isAtBottom')
  const showButton = scroller.useState((state) => state.scrollY <= 0.97)

  React.useEffect(() => {
    let intervalId = 0

    intervalId = window.setInterval(() => {
      if (isAtBottom) {
        setNewMessages([])
        ReactDOM.flushSync(() =>
          setMessages((currentMessages) =>
            currentMessages.concat({
              username: faker.internet.userName(),
              content: faker.lorem.sentence(),
            }),
          ),
        )
        scroller.scrollToBottom()
      } else {
        setNewMessages((currentNewMessages) =>
          currentNewMessages.concat({
            username: faker.internet.userName(),
            content: faker.lorem.sentence(),
          }),
        )
      }
    }, timeoutMessages[Math.floor(Math.random() * timeoutMessages.length)])

    return () => clearInterval(intervalId)
  }, [isAtBottom, scroller])

  return (
    <main className="min-h-screen flex justify-center items-center">
      <div className="w-80 h-96 border border-border rounded-lg text-sm flex flex-col relative">
        <AnimatePresence>
          {showButton && (
            <motion.button
              initial={{ y: 20, x: '-50%', opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { duration: 0.2 } }}
              exit={{ y: 20, opacity: 0, transition: { duration: 0.1 } }}
              className="absolute bottom-20 z-50 left-1/2 translate-x-[-50%] bg-muted text-foreground rounded-sm px-3 py-1.5 text-xs font-medium shadow-lg border border-border"
              onClick={() => {
                ReactDOM.flushSync(() => {
                  setMessages((currentMessages) => currentMessages.concat(newMessages))
                })
                setNewMessages([])
                scroller.scrollToBottom()
              }}
            >
              Scroll to bottom {newMessages.length > 0 && `(${newMessages.length})`}
            </motion.button>
          )}
        </AnimatePresence>
        <div
          ref={scroller.setScrollerElement}
          className="flex flex-col flex-1 gap-3 p-2 overflow-auto max-h-full"
        >
          {messages.map((message, index) => (
            <p key={index}>
              <span className="font-bold">{message.username}</span>: {message.content}
            </p>
          ))}
        </div>
        <div className="p-2 relative">
          <input
            placeholder="Send a message"
            readOnly
            className="w-full py-3 px-2 border border-border rounded-sm outline-none focus:ring focus:ring-ring"
          />
        </div>
      </div>
    </main>
  )
}
