import { Link, Outlet, createRootRoute, useLocation } from '@tanstack/react-router'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'

export const Route = createRootRoute({
  component: () => {
    const location = useLocation()
    const pathname = location.pathname.split('/')[1]
    const tabDefaultValue = pathname === 'report' ? 'report' : 'expenses'
    return <div className='container mx-auto p-4'>
      <Tabs defaultValue={tabDefaultValue} className="">
        <TabsList>
          <Link to="/">
            <TabsTrigger value="expenses">
              Expenses
            </TabsTrigger>
          </Link>
          <Link to="/report">
            <TabsTrigger value="report">
              Reports
            </TabsTrigger>
          </Link>
        </TabsList>
      </Tabs>
      <Outlet />
    </div>

  }

})
