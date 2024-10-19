import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => {
    return <div className='container p-4 mx-auto'>
      <Outlet />
    </div>

  }

})
