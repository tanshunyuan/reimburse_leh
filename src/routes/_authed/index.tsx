import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '~/pages/homepage'

export const Route = createFileRoute('/_authed/')({
  component: () => <HomePage />,
})
