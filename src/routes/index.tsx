import { createFileRoute } from '@tanstack/react-router'
import { Homepage } from '~/pages/homepage'

export const Route = createFileRoute('/')({
  component: () => <Homepage/>,
})
