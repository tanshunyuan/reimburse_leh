import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '~/pages/homepage'

export const Route = createFileRoute('/')({
  component: () => <HomePage/>,
})
