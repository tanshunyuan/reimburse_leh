import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed')({
  beforeLoad: ({ context }) => {
    console.log({ 'hello': context})
    // if (!context.user) {
    //   throw new Error('Not authenticated')
    // }
  },
  errorComponent: ({ error }) => {
    // if (error.message === 'Not authenticated') {
    //   return <Login />
    // }
    // throw error
  },
})
