import { createFileRoute } from '@tanstack/react-router'
import { ExpenseDetailsPage } from '~/pages/expenses/details'

export const Route = createFileRoute('/_authed/expenses/$expenseId/')({
  component: () => <ExpenseDetailsPage />,
})
