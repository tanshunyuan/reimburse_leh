import { createFileRoute } from '@tanstack/react-router'
import { CreateExpensePage } from '~/pages/expenses/create'

export const Route = createFileRoute('/expenses/create')({
  component: () => <CreateExpensePage/>
})
