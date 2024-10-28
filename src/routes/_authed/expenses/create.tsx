import { createFileRoute } from '@tanstack/react-router'
import { CreateExpensePage } from '~/pages/expenses/create'

export const Route = createFileRoute('/_authed/expenses/create')({
  component: () => <CreateExpensePage />,
})
