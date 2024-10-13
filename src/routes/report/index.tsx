import { createFileRoute } from '@tanstack/react-router'
import { ViewReportsPage } from '~/pages/report/view-reports'

export const Route = createFileRoute('/report/')({
  component: () => <ViewReportsPage />,
})
