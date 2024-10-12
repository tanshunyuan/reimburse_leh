import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <div className='container mx-auto p-4'>
      <Outlet />
    </div>
  ),
})
